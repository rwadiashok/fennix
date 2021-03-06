const {DEVICE_BATTERY_MAP} = require('../util-module/device-status-constants');

const notNullCheck = (data) => data !== null && data !== undefined && data !== '' && data !== 'undefined' && data !== 'null';
const arrayNotEmptyCheck = (arrayData) => notNullCheck(arrayData) && Object.prototype.toString.call(arrayData) === '[object Array]' && arrayData.length > 0;
const objectHasPropertyCheck = (objectData, propertyName) => notNullCheck(objectData) && objectData.hasOwnProperty(propertyName) && notNullCheck(objectData[propertyName]);

const deviceStatusMapper = (key, value) => {
    let returnValue = {deviceStatus: '', color: ''};
    Object.keys(DEVICE_BATTERY_MAP[key]).map((item) => {
        if (value > DEVICE_BATTERY_MAP[key][item]['startValue'] && value < DEVICE_BATTERY_MAP[key][item]['endValue']) {
            returnValue.deviceStatus = item;
            returnValue.color = DEVICE_BATTERY_MAP[key][item]['color']
        }
    });
    return returnValue;
};
module.exports = {
    notNullCheck,
    arrayNotEmptyCheck,
    deviceStatusMapper,
    objectHasPropertyCheck
};