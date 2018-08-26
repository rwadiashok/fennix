const beneficiaryQueries = require('../queries/beneficiary-query');
const {connectionCheckAndQueryExec} = require('../../util-module/custom-request-reponse-modifiers/response-creator');
const {requestInModifier, insertQueryCreator, updateQueryCreator} = require('../../util-module/request-validators');
const {TABLE_BENEFICIARIES, TABLE_ACCOUNTING, TABLE_FAMILY_INFO} = require('../../util-module/db-constants');

const getBeneficiaryByUserIdAccessor = async (req) => {
    let returnObj, modifiedQuery;
    modifiedQuery = requestInModifier(req, beneficiaryQueries.selectBeneficiaryByUserIdQuery, false);
    returnObj = await connectionCheckAndQueryExec(req, modifiedQuery);
    return returnObj;
};

const getBenefeciaryAggregator = async (req) => {
    let returnObj, modifiedQuery, groupByQuery = 'group by beneficiary_role', request;
    modifiedQuery = requestInModifier(req.userIdList, beneficiaryQueries.selectBeneficiaryByOwnerIdQuery, true);
    request = [req.languageId, ...req.userIdList];
    returnObj = await connectionCheckAndQueryExec(request, `${modifiedQuery} ${groupByQuery}`);
    return returnObj;
};

const getBeneficiaryNameFromBeneficiaryIdAccessor = async (req, language) => {
    let returnObj, modifiedQuery;
    modifiedQuery = requestInModifier(req, beneficiaryQueries.selectBeneficiaryNameFromBeneficiaryIdQuery, true);
    // console.log('modified Query' + modifiedQuery);
    let modifiedParams = [language];
    modifiedParams = [...modifiedParams, ...req];
    returnObj = await connectionCheckAndQueryExec(modifiedParams, modifiedQuery);
    return returnObj;
};
const beneficiaryListOfUnAssignedDevicesAccesor = async (req) => {
    let returnObj;
    returnObj = await connectionCheckAndQueryExec(req, beneficiaryQueries.selectBeneficiariesOfUnAssignedDevicesQuery);
    return returnObj;
};

const addBeneficiaryAccessor = async (req) => {
    let returnObj, finalResponse;
    finalResponse = insertQueryCreator(req, TABLE_BENEFICIARIES, beneficiaryQueries.insertBeneficiaryQuery);
    returnObj = await connectionCheckAndQueryExec(finalResponse.valuesArray, finalResponse.modifiedInsertQuery);
    // console.log(returnObj);
    return returnObj;
};

const getBeneficiaryByBeneficiaryIdAccesor = async (req) => {
    let returnObj;
    returnObj = await connectionCheckAndQueryExec(req, beneficiaryQueries.getBeneficiaryByBeneficiaryIdQuery);
    return returnObj;
};

const getBeneficiaryDetailsAccessor = async (req) => {
    let returnObj;
    returnObj = await connectionCheckAndQueryExec(req, beneficiaryQueries.getBeneficiaryDetailsQuery);
    return returnObj;
};

const getBeneifciaryIdList = async (req) => {
    let returnObj;
    returnObj = await connectionCheckAndQueryExec(req, beneficiaryQueries.getBenefeciaryIdListForOwnerAndCenterQuery);
    return returnObj;
};
const getBeneficiaryListByOwnerId = async (req) => {
    let returnObj, request = [...req.userIdList, req.centerId, req.skip, req.limit], modifiedQuery,
        extraQuery = `and center_id = $${req.userIdList.length + 1} order by device_updated_date desc nulls last offset $${req.userIdList.length + 2} limit $${req.userIdList.length + 3}`;
    modifiedQuery = requestInModifier(req.userIdList, beneficiaryQueries.selectBeneficiaryListByOwnerUserIdQuery, false);
    modifiedQuery = `${modifiedQuery}${extraQuery}`;
    returnObj = await connectionCheckAndQueryExec(request, modifiedQuery);
    return returnObj;
};

const getBeneficiaryListForAddTicketAccessor = async (req) => {
    let returnObj, modifiedQuery;
    modifiedQuery = requestInModifier(req.userIdList, beneficiaryQueries.selectBeneficiaryListByOwnerUserIdQuery, false);
    returnObj = await connectionCheckAndQueryExec(req.userIdList, modifiedQuery);
    return returnObj;
};

const getTotalRecordsBasedOnOwnerUserIdAndCenterAccessor = async (req) => {
    let returnObj, modifiedQuery;
    modifiedQuery = requestInModifier(req.userIdList, beneficiaryQueries.getTotalRecordsBasedOnOwnerUserIdCenterIdQuery, false);
    returnObj = await connectionCheckAndQueryExec(req.userIdList, modifiedQuery);
    return returnObj;
};

const getAllBeneficiaryDetailsAccessor = async (req) => {
    let returnObj;
    returnObj = await connectionCheckAndQueryExec(req, beneficiaryQueries.getAllBeneficiaryDetailsQuery);
    return returnObj;
};

const updateBeneficiaryAccessor = async (req) => {
    let returnObj, updatedQueryCreatorResponse, fields = Object.keys(req.body), request = [];
    fields.sort();
    fields.splice(fields.indexOf('beneficiaryId'), 1);
    updatedQueryCreatorResponse = updateQueryCreator('beneficiaries', fields, 'beneficiaryid');
    updatedQueryCreatorResponse.presentFields.forEach((f) => request.push(req.body[f]));
    request.push(req.body.beneficiaryId);
    returnObj = await connectionCheckAndQueryExec(request, updatedQueryCreatorResponse.query);
    return returnObj;
};

const addFamilyInfoAccessor = async (req) => {
    let returnObj, finalResponse;
    finalResponse = insertQueryCreator(req, TABLE_FAMILY_INFO, beneficiaryQueries.insertBeneficiaryQuery);
    returnObj = await connectionCheckAndQueryExec(finalResponse.valuesArray, finalResponse.modifiedInsertQuery);
    return returnObj;
};

const addAccountingAccessor = async (req) => {
    let returnObj, finalResponse;
    finalResponse = insertQueryCreator(req, TABLE_ACCOUNTING, beneficiaryQueries.insertBeneficiaryQuery);
    returnObj = await connectionCheckAndQueryExec(finalResponse.valuesArray, finalResponse.modifiedInsertQuery);
    return returnObj;
};

module.exports = {
    addAccountingAccessor,
    addFamilyInfoAccessor,
    updateBeneficiaryAccessor,
    getBeneficiaryByUserIdAccessor,
    getBenefeciaryAggregator,
    getBeneficiaryListByOwnerId,
    getBeneifciaryIdList,
    getBeneficiaryDetailsAccessor,
    getBeneficiaryNameFromBeneficiaryIdAccessor,
    getTotalRecordsBasedOnOwnerUserIdAndCenterAccessor,
    addBeneficiaryAccessor,
    getBeneficiaryListForAddTicketAccessor,
    getBeneficiaryByBeneficiaryIdAccesor,
    getAllBeneficiaryDetailsAccessor,
    beneficiaryListOfUnAssignedDevicesAccesor
};