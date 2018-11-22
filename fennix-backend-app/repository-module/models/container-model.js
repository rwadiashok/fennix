const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
let SchemaType = mongoose.Schema.Types;
const elocksLocationSchema = new Schema({
    _id: Number,
    containerId: Number,
    deviceId: Number,
    deviceDate: Date,
    speed: SchemaType.Double,
    latitude: SchemaType.Double,
    longitude: SchemaType.Double
});

const elocksLocationCounterSchema = new Schema({counter: Number});

const locationDeviceAttributeContainerMasterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    containerId: Number,
    locationId: Number,
    deviceAttributeId: Number,
    deviceId: Number
});

const elocksDeviceAttributesSchema = new Schema({
    _id: Number,
    gps: Number,
    direction: Number,
    mileage: Number,
    gpsQuality: Number,
    vehicleId: Number,
    deviceStatus: Number,
    geoFenceAlarm: Boolean,
    containerId: Number,
    deviceId: Number,
    cellId: Number,
    lac: String,
    locationId: Number,
    speed: SchemaType.Double,
    gpsStatus: String,
    serverDate: Date,
    batteryPercentage: SchemaType.Double,
    deviceUpdatedDate: Date
});

const elocksDeviceAttributesCounterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    counter: Number
});

const elocksDumpMasterSchema = new Schema({
    masterDate: Date, // default: 1970 -> location master date
    dumpDate: Date    // default: 1970 -> device date from the dump data
});

const elocksDeviceSchema = new Schema({
    _id: Number,
    containerId: Number,
    deviceTypeId: Number,
    imei: Number,
    simCardId: Number,
    active: Boolean,
    online: String,
    centerId: Number,
    firmwareVersion: String,
    createdDate: Date,
    updatedDate: Date
});

const elocksDeviceTypeSchema = new Schema({
    _id: Number,
    name: String,
    minSpeed: Number,
    maxHdop: Number,
    minGpsLevel: Number,
    minDiffTrackPoints: Number,
    timeout: Number,
    stationaryTimeout: Number,
    icon: String,
    mapIcon: String,
    tailColor: String,
    tailPoints: Number,
    active: Boolean,
    createdDate: Date,
    updatedDate: Date
});
const elockTripDataSchema = new Schema({
    tripId: Number,
    containerId: Number,
    deviceId: Number,
    startDate: Date,
    endDate: Date,
    expectedStartDate: Date,
    expectedEndDate: Date,
    isTripActive: Boolean,
    startAddress: {
        lat: SchemaType.Double,
        lng: SchemaType.Double
    },
    endAddress: {
        lat: SchemaType.Double,
        lng: SchemaType.Double
    },
    restrictions: [
        {
            restrictionName: String,
            restrictionType: String,
            startDate: Date,
            finishDate: Date,
            repeatRules: [String],
            onAlert: Boolean,
            isActive: Boolean,
            locationDetails: [
                {
                    lat: SchemaType.Double,
                    lng: SchemaType.Double
                }
            ]
        }
    ],
    latArray: [SchemaType.Double],
    lngArray: [SchemaType.Double]
});

const elockTripCounterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    counter: Number
});
const elocksDumpDataSchema = new Schema({
    containerId: String,
    deviceId: Number,
    locationId: Number,
    gps: Number,
    speed: SchemaType.Double,
    direction: String,
    mileage: String,
    gpsQuality: String,
    vehicleId: String,
    deviceStatus: String,
    serverDate: Date,
    deviceUpdatedDate: Date,
    batteryPercentage: SchemaType.Double,
    cellId: String,
    lac: String,
    gsmQuality: String,
    geoFenceAlarm: String,
    deviceDate: Date,
    latitude: SchemaType.Double,
    latitudeDirection: SchemaType.Double,
    longitude: SchemaType.Double,
    longitudeDirection: SchemaType.Double
});


const ElocksLocationCounterModel = mongoose.model('ElocksLocationCounter', elocksLocationCounterSchema, 'elocksLocationCounter');
const ElocksLocationModel = mongoose.model('ElocksLocation', elocksLocationSchema, 'elocksLocation');
const ElocksDeviceAttributeModel = mongoose.model('ElocksDeviceAttributes', elocksDeviceAttributesSchema, 'elocksDeviceAttributes');
const ElocksDeviceAttributesCounterModel = mongoose.model('ElocksDeviceAttributesCounter', elocksDeviceAttributesCounterSchema, 'elocksDeviceAttributesCounter');
const ElocksDeviceModel = mongoose.model('ElocksDevice', elocksDeviceSchema, 'elocksDevices');
const ElocksDeviceTypeModel = mongoose.model('ElocksDeviceType', elocksDeviceTypeSchema, 'elocksDeviceTypes');
const ElocksDeviceCounter = mongoose.model('ElocksDeviceCounter', elocksDeviceAttributesCounterSchema, 'elocksDevicesCounter');
const LocationDeviceAttributeContainerMasterModel = mongoose.model('LocationDeviceContainerAttribute', locationDeviceAttributeContainerMasterSchema, 'locationDeviceAttributeContainerMaster');
const ElocksDumpMasterModel = mongoose.model('ElocksDumpMaster', elocksDumpMasterSchema, 'elocksDumpMaster');
const ElocksDumpDataModel = mongoose.model('ElocksDumpData', elocksDumpDataSchema, 'elocksDumpData');
const ElocksTripDataModel = mongoose.model('ElocksTripData', elockTripDataSchema, 'elockTripData');
const ElocksTripCounterModel = mongoose.model('ElocksTripCounter', elockTripCounterSchema, 'elockTripCounter');

module.exports = {
    ElocksTripDataModel,
    ElocksTripCounterModel,
    ElocksLocationModel,
    ElocksDumpMasterModel,
    ElocksDumpDataModel,
    LocationDeviceAttributeContainerMasterModel,
    ElocksLocationCounterModel,
    ElocksDeviceAttributeModel,
    ElocksDeviceAttributesCounterModel,
    ElocksDeviceModel,
    ElocksDeviceTypeModel
};
