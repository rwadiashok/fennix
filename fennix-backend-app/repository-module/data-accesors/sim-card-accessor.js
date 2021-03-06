const simCardQueries = require('../queries/simcard-query');

const listUnAssignedSimcardsAccessor = async (req) => {
    let returnObj;
    returnObj = await simCardQueries.listUnAssignedSimcardsQuery(req);
    return returnObj;
};

const listSimcardTypesAccessor = async () => {
    let returnObj;
    returnObj = await simCardQueries.listSimcardTypesQuery();
    return returnObj;
};

const getSimcardDetailsAccessor = async (req) => {
    let responseObj;
    responseObj = await simCardQueries.getSimcardDetailsQuery(req);
    return responseObj;
};

const addSimcardAccessor = async (req) => {
    let returnObj;
    returnObj = await simCardQueries.insertSimcardQuery(req);
    return returnObj;
};

const fetchNextPrimaryKeyAccessor = async () => {
    let returnObj;
    returnObj = await simCardQueries.fetchNextPrimaryKeyQuery();
    return returnObj;
};

// const insertNextPrimaryKeyAccessor = async (req) => {
//     await simCardQueries.insertNextPrimaryKeyQuery(req);
// };
const addDeviceIdForSimcardAccessor = async (req) => {
    await simCardQueries.addDeviceIdForSimcardQuery(req);
};

const getTotalNoOfSimcardsAccessor = async (req) => {
    let responseObj;
    responseObj = await simCardQueries.getTotalNoOfSimcardsQuery(req);
    return responseObj;
};

module.exports = {
    listUnAssignedSimcardsAccessor,
    addDeviceIdForSimcardAccessor,
    listSimcardTypesAccessor,
    addSimcardAccessor,
    getSimcardDetailsAccessor,
    // insertNextPrimaryKeyAccessor,
    fetchNextPrimaryKeyAccessor,
    getTotalNoOfSimcardsAccessor
};