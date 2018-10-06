const {arrayNotEmptyCheck, notNullCheck, objectHasPropertyCheck} = require('../../util-module/data-validators');
const {deviceCommandConstants} = require('../../util-module/device-command-constants');
const locationAccessor = require('../../repository-module/data-accesors/location-accesor');
const deviceAccessor = require('../../repository-module/data-accesors/device-accesor');
const {deviceValidator} = require('../../util-module/device-validations');


let locationObj = {}, deviceObj = {};
const locationUpdateBusiness = async (data) => {
    console.log(deviceCommandConstants.deviceCommandConstants);
    let returnString = '';
    if (data.indexOf('#SA') !== -1) {
        returnString = processData(data);
    } else if (data.indexOf('#RD') !== -1) {
        await processLocation(data);
    }
    return returnString;
};

const processData = (loginString) => {
    let returnString, loginFlag;
    const checkSum = 3;
    const dataCommand = loginString.substr(0, 3);
    locationObj = {
        connectionSession: loginString.substr(3, 6),
        serialNumber: loginString.substr(9, 5),
    };
    const loginHome = dataCommand.length + locationObj.connectionSession.length + locationObj.serialNumber.length + loginString.substr(14, 15).length;
    deviceObj = {
        imei: loginString.substr(14, 15),
        firmwareVersion: loginString.substr(loginHome, (loginString.length - 1) - (loginHome - 1) - checkSum)
    };
    loginFlag = processLogin(loginString.substr(14, 15));
    returnString = loginFlag ? loginString.replace(loginString.substr(0, 3), '#SB') : loginString;
    return returnString;
};

const processLocation = async (location) => {
    let ticketResponse;
    let locationObj = {}, latitude, longitude;
    const NudosToKm = 1.852;
    const direction = 6;
    let day = location.substr(29, 2);
    let month = parseInt(location.substr(31, 2)) - 1;
    let year = `20${location.substr(33, 2)}`;
    let hours = location.substr(35, 2);
    let minutes = location.substr(37, 2);
    let seconds = location.substr(39, 2);
    let dateTime = new Date(year, month, day, hours, minutes, seconds);
    let beneficiaryResponse = await deviceAccessor.getBeneficiaryIdByImeiAccessor(parseInt(location.substr(14, 15)));
    if (arrayNotEmptyCheck(beneficiaryResponse) && notNullCheck(beneficiaryResponse[0]) && notNullCheck(beneficiaryResponse[0]['beneficiaryId'])) {
        let masterRequest = {
            deviceId: parseInt(beneficiaryResponse[0]['_id']),
            beneficiaryId: parseInt(beneficiaryResponse[0]['beneficiaryId'])
        };
        const vel = location.substr(62, 5);
        let deviceAttribute = {
            beneficiaryId: parseInt(beneficiaryResponse[0]['beneficiaryId']),
            serialNumber: location.substr(9, 5),
            hdop: location.substr(99, 2),
            cellId: location.substr(108, 4),
            mcc: location.substr(101, 3),
            lac: location.substr(104, 4),
            serverDate: new Date(),
            speed: ((parseInt(vel.substr(0, 3), 10) + parseFloat(vel.substr(4, 1)) / 10) * NudosToKm).toFixed(2),
            course: parseInt(location.substr(67, 2)) * direction,
            moveDistance: parseInt(location.substr(69, 5)),
            gpsStatus: location.substr(74, 1),
            alarmStatus: location.substr(75, 21),
            ...alarmStatusDeCompiler(location.substr(75, 21)),
            satellitesNumber: location.substr(96, 2),
            deviceUpdatedDate: dateTime,
            gpsFixedStatus: location.substr(98, 1)
        };
        let lat = location.substr(41, 10);
        let signLat = lat.indexOf('N') !== -1 ? 1 : -1;
        latitude = signLat * getValue(lat.substr(0, 2), lat.substr(2, 2), lat.substr(5, 4));
        let lng = location.substr(51, 11);
        let signLng = lng.indexOf('E') !== -1 ? 1 : -1;
        longitude = signLng * getValue(lng.substr(0, 3), lng.substr(3, 2), lng.substr(6, 4));
        locationObj = {
            longitude: longitude,
            latitude: latitude,
            beneficiaryId: parseInt(beneficiaryResponse[0]['beneficiaryId']),
            deviceDate: dateTime
        };
        const locationId = await locationAccessor.updateLocation(locationObj);
        ticketResponse = deviceValidator(deviceAttribute, masterRequest.beneficiaryId, locationObj);
        // console.log(ticketResponse);
        // if (notNullCheck(ticketResponse)) {
        //     addAutomatedTicketBusiness(ticketResponse, masterRequest.beneficiaryId);
        // }
        deviceAttribute = {...deviceAttribute, locationId: locationId['_doc']['counter']};
        const deviceAttributeId = await deviceAccessor.updateDeviceAttributesAccessor(deviceAttribute);
        masterRequest = {
            ...masterRequest,
            locationId: parseInt(locationId['_doc']['counter']),
            deviceAttributeId: parseInt(deviceAttributeId['_doc']['counter'])
        };
        // console.log('device Response');
        // console.log(masterRequest.deviceAttributeId);
        // console.log(masterRequest.deviceId);
        deviceAccessor.updateLocationDeviceAttributeMasterAccessor(masterRequest).then((doc) => {
            // console.log(doc)
        });
    }
    // socketIO.listen(3110);
    // socketIO.on('connection', (sock) => {
    //     console.log('on connection');
    //     sock.on('requestDetails', async (data) => {
    //         let returnObj;
    //         returnObj = await beneficiaryBusiness.beneficiaryMapDataList(data);
    //         console.log('map data');
    //         console.log(returnObj);
    //         sock.emit('mapData', returnObj);
    //     })
    // })

};

processLogin = async (imei) => {
    let returnFlag, beneficiaryResponse = await deviceAccessor.getBeneficiaryIdByImeiAccessor(parseInt(imei));
    // console.log('Beneficiary details:');
    // console.log(beneficiaryResponse);
    // // console.log('IMEI Number:');
    // console.log(imei);
    returnFlag = arrayNotEmptyCheck(beneficiaryResponse);
    return returnFlag;
};

const getValue = (intPart, decimalPart1, decimalPart2) => {
    let ret = 0;
    ret = parseFloat(intPart);
    ret += parseFloat(decimalPart1) / 60;
    ret += parseFloat(decimalPart2) / (60 * 10000);
    return ret;
};

const alarmStatusDeCompiler = (alarmStatus) => {
    return {
        beltStatus: alarmStatus.substr(0, 1),
        shellStatus: alarmStatus.substr(1, 1),
        gsmSignal: getGSMLevel(parseInt(alarmStatus.substr(2, 2))),
        batteryVoltage: (parseInt(alarmStatus.substr(4, 1)) + (parseInt(alarmStatus.substr(5, 2)) / 100)).toFixed(2),
        batteryPercentage: batteryPercentCalculator(parseInt(alarmStatus.substr(4, 1)) + (parseInt(alarmStatus.substr(5, 2)) / 100)).toFixed(2),
        chargeStatus: alarmStatus.substr(7, 1),
        lowPowerStatus: alarmStatus.substr(8, 1),
        dataLoggerStatus: alarmStatus.substr(9, 1),
        stillStatus: alarmStatus.substr(10, 1),
        enableAlarmsStatus: parseInt(alarmStatus.substr(11, 1)) === 1,
        buzzerStatus: parseInt(alarmStatus.substr(12, 1)) === 1,
        vibratorStatus: parseInt(alarmStatus.substr(13, 1)) === 1,
        rfConnectionStatus: alarmStatus.substr(14, 1),
        rfgSensorStatus: alarmStatus.substr(15, 1),
        rfPlugStatus: alarmStatus.substr(16, 1)
    };
};

const batteryPercentCalculator = (batteryVoltage) => {
    const perc = [0, 9, 15, 20, 100];
    const volts = [3.4, 3.46, 3.55, 3.6, 4.1];
    let ret = 0, dvRange, dvMeasure, dpRange, vSelected = 0;
    for (let v = 0; v < volts.length; v++) {
        if (batteryVoltage > volts[v]) {
            vSelected = v;
        } else {
            break;
        }
    }
    if (vSelected === 0) {
        ret = 0;
    } else if (vSelected > 0 && vSelected < volts.length - 1) {
        dvRange = volts[vSelected + 1] - volts[vSelected];
        dvMeasure = batteryVoltage - volts[vSelected];
        dpRange = perc[vSelected + 1] - perc[vSelected];
        ret = perc[vSelected] + ((dvMeasure * dpRange) / dvRange);
    }
    else if (vSelected === (volts.length - 1)) {
        ret = 100;
    }
    return ret;
};

const getGSMLevel = (gsmStatus) => {
    let gsmLevel;
    if (gsmStatus < 4 || gsmStatus === 99) {
        gsmLevel = 0;
    } else if (4 < gsmStatus < 10) {
        gsmLevel = 1;
    } else if (10 < gsmStatus < 16) {
        gsmLevel = 2;
    } else if (16 < gsmStatus < 22) {
        gsmLevel = 3;
    } else if (22 < gsmStatus < 28) {
        gsmLevel = 4;
    } else if (28 < gsmStatus) {
        gsmLevel = 5;
    }
    return gsmLevel;
};

module.exports = {
    locationUpdateBusiness
};