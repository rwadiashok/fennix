const deviceQueries = require('../queries/device-query');

const deviceAggregator = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.userIdDeviceAggregatorQuery(req);
    return returnObj;
};
const listUnAssignedDevicesAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.listUnAssignedDevicesQuery(req);
    return returnObj;
};
const deviceBybeneficiaryQuery = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.deviceDetailsByBeneficiaryId(req);
    return returnObj;
};

const updateDeviceAttributesAccessor = async (req) => {
    let counterResponse = await deviceQueries.getDeviceAttributeCounterQuery();
    req = {...req, _id: counterResponse['_doc']['counter']};
    await deviceQueries.updateDeviceAttributeQuery(req);
    return counterResponse;
};

const unlinkDeviceForBeneficiaryAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.unlinkDeviceForBeneficiaryQuery(req);
    return returnObj;
};

const getTotalNoOfDevicesAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getTotalNoOfDevicesQuery(req);
    return returnObj;
};

const getBeneficiaryIdByImeiAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getBeneficiaryIdByImeiQuery(req);
    return returnObj;
};

const getContainerIdByImeiAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getContainerIdByImeiQuery(req);
    return returnObj;
};

const updateLocationDeviceAttributeMasterAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.updateLocationDeviceAttributeMasterQuery(req);
    return returnObj;
};

const getDeviceDetailsForListOfBeneficiariesAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getDeviceDetailsForListOfBeneficiariesQuery(req);
    return returnObj;
};

const listDevicesAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.listDevicesQuery(req);
    return returnObj;
};

const listDeviceTypesAccessor = async () => {
    let returnObj;
    returnObj = await deviceQueries.listDeviceTypesQuery();
    return returnObj;
};

const insertDeviceAccessor = async (req) => {
    deviceQueries.insertDeviceQuery(req);
};

const fetchNextPrimaryKeyAccessor = async () => {
    let returnObj;
    returnObj = await deviceQueries.fetchNextPrimaryKeyQuery();
    return returnObj;
};


const getDeviceByDeviceIdAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getDeviceDetailsByDeviceIdQuery(req);
    return returnObj;
};

const getDeviceByBeneficiaryIdAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getDeviceDetailsByBeneficiaryIdQuery(req);
    return returnObj;
};

const updateDeviceWithBeneficiaryIdAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.updateDeviceWithBeneficiaryIdQuery(req);
    return returnObj;
};

const unlinkLocationMasterForBeneficiaryAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.unlinkLocationMasterForBeneficiaryQuery(req);
    return returnObj;
};

const unlinkDeviceForContainerAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.unlinkDeviceForContainerQuery(req);
    return returnObj;
};
const unlinkLocationMasterForContainerAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.unlinkLocationMasterForContainerQuery(req);
    return returnObj;
};

const updateDeviceWithContainerIdAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.updateDeviceWithContainerIdQuery(req);
    return returnObj;
};

const getDeviceDetailsForListOfContainersAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getDeviceDetailsForListOfContainersQuery(req);
    return returnObj;
};
const listUnAssignedDevicesForContainerAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.listUnAssignedDevicesForContainerQuery(req);
    return returnObj;
};

const deviceByContainerAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.deviceDetailsByContainerIdQuery(req);
    return returnObj;
};

const checkIfDeviceIsPresentAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.checkIfDeviceIsPresentQuery(req);
    return returnObj;
};

const getPhoneNoForContainerAccessor = async (req) => {
    let returnObj;
    returnObj = await deviceQueries.getPhoneNoForContainerQuery(req);
    return returnObj;
};

module.exports = {
    checkIfDeviceIsPresentAccessor,
    unlinkDeviceForContainerAccessor,
    deviceByContainerAccessor,
    unlinkLocationMasterForContainerAccessor,
    updateDeviceWithContainerIdAccessor,
    getDeviceDetailsForListOfContainersAccessor,
    listUnAssignedDevicesForContainerAccessor,
    unlinkLocationMasterForBeneficiaryAccessor,
    deviceAggregator,
    getPhoneNoForContainerAccessor,
    listDeviceTypesAccessor,
    deviceBybeneficiaryQuery,
    getDeviceDetailsForListOfBeneficiariesAccessor,
    listDevicesAccessor,
    insertDeviceAccessor,
    updateDeviceWithBeneficiaryIdAccessor,
    updateDeviceAttributesAccessor,
    fetchNextPrimaryKeyAccessor,
    getContainerIdByImeiAccessor,
    getDeviceByDeviceIdAccessor,
    getBeneficiaryIdByImeiAccessor,
    getDeviceByBeneficiaryIdAccessor,
    listUnAssignedDevicesAccessor,
    unlinkDeviceForBeneficiaryAccessor,
    updateLocationDeviceAttributeMasterAccessor,
    getTotalNoOfDevicesAccessor
};
