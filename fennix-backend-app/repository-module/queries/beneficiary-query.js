const selectBeneficiaryByUserIdQuery = 'select beneficiaryid from beneficiaries where owner_user_id IN ';

const getTotalRecordsBasedOnOwnerUserIdCenterIdQuery = 'select count(*) from beneficiaries b where owner_user_id IN ';

const selectBeneficiaryByOwnerIdQuery = 'select (select localized_text from localization where locale_key = (select role_name from roles where role_id = beneficiary_role) and language = $1) as role_name, count(beneficiary_role) from beneficiaries\n' +
    'where owner_user_id IN ';

// const selectBeneficiaryListByOwnerUserIdQuery = 'select beneficiaryId, firstname, middle_name, emailid, crime_id, mobileno, gender\n' +
//     'from beneficiaries\n' +
//     'where owner_user_id = $1 and center_id = $2\n' +
//     'order by $3\n' +
//     'offset $4 limit $5';

const checkBeneficiaryEmailIdQuery = 'select beneficiaryid from beneficiaries where emailid = $1';
// select ,u.user_role,password, first_name, last_name, user_id, owner_user_id, email_id, isactive,u.center_id from users u\n' +
// 'join roles r on r.role_id = u.user_role\n' +
// 'where email_id=$1'
const authenticateBeneficiaryQuery = 'select (select localized_text from localization where locale_key = (select role_name from roles where role_id = b.beneficiary_role) and language = $2) as role_name,b.beneficiary_role, firstname,middle_name,first_last_name,second_last_name, beneficiaryid, owner_user_id, emailid, isactive,b.center_id from beneficiaries b\n' +
    '       join roles r on r.role_id = b.beneficiary_role\n' +
    '        where emailid=$1';

const insertBeneficiaryQuery = 'insert into ';

const selectBeneficiariesOfUnAssignedDevicesQuery = 'select beneficiaryid, concat(firstname, \' \', middle_name, \' \', first_last_name, \' \', second_last_name) as full_name from beneficiaries where device_id is null';

const getBenefeciaryIdListForOwnerAndCenterQuery = 'select beneficiaryId,firstname,middle_name,first_last_name,second_last_name,beneficiary_role as role_id,gender,emailid, (select localized_text from localization where locale_key = (select role_name from roles where role_id = beneficiary_role) and language = $6) as role, device_updated_date, document_id, mobileno,image from beneficiaries\n' +
    'where owner_user_id = (select user_id from users where user_id = $1) and center_id = $2\n' +
    'order by $3 desc nulls last\n' +
    'offset $4 limit $5';
const getBeneficiaryByBeneficiaryIdQuery = 'select concat(firstname, \' \', middle_name, \' \', first_last_name, \' \', second_last_name) as full_name,beneficiary_role, emailid, document_id,crime_id, mobileno, gender, address1,dob, image, (select localized_text from localization where locale_key = (select role_name from roles where role_id = beneficiary_role) and language=$2) as role_name from beneficiaries b where b.beneficiaryid =$1';

const getBeneficiaryDetailsQuery = 'select beneficiaryId,firstname,middle_name,first_last_name,second_last_name, gender, emailid, (select localized_text from localization where locale_key = (select role_name from roles where role_id = beneficiary_role) and language=$2) as role_name, device_updated_date, mobileno from beneficiaries where beneficiaryId = $1';

// const getTotalRecordsBasedOnOwnerUserIdCenterIdQuery = 'select count(*) from beneficiaries b where owner_user_id = $1 and center_id = $2';


const selectBeneficiaryNameFromBeneficiaryIdQuery = 'select beneficiaryid,concat(firstname, \' \', middle_name, \' \', first_last_name, \' \', second_last_name) as full_name, (select localized_text from localization where locale_key = (select role_name from roles where role_id = b.beneficiary_role) and language = $1) as role_name, beneficiary_role, gender from public.beneficiaries b where beneficiaryid IN';

const selectBeneficiaryListByOwnerUserIdQuery = 'select concat(firstname, \' \', middle_name, \' \', first_last_name, \' \', second_last_name) as full_name, emailid, document_id,crime_id, mobileno, gender, location_id, (select name from centers where center_id = b.center_id) as center_name, (select localized_text from localization where locale_key IN (select role_name from roles where role_id = b.beneficiary_role) and language = \'EN_US\') as role_name,beneficiary_role, beneficiaryid,image from beneficiaries b where owner_user_id IN ';

const getAllBeneficiaryDetailsQuery = 'select * from beneficiaries  where beneficiaryid =$1';
// '\n' +
// 'left join family_info f \n' +
// 'on b.beneficiaryid = f.beneficiaryid and b.beneficiaryid =$1';
const getBeneficiaryDocumentByBeneficiaryIdQuery = 'select dropbox_base_path,location_3 from from beneficiaries  where beneficiaryid =$1';
module.exports = {
    getBeneficiaryDetailsQuery,
    getBeneficiaryDocumentByBeneficiaryIdQuery,
    getTotalRecordsBasedOnOwnerUserIdCenterIdQuery,
    selectBeneficiaryNameFromBeneficiaryIdQuery,
    selectBeneficiaryByUserIdQuery,
    selectBeneficiaryByOwnerIdQuery,
    selectBeneficiaryListByOwnerUserIdQuery,
    checkBeneficiaryEmailIdQuery,
    insertBeneficiaryQuery,
    authenticateBeneficiaryQuery,
    getBeneficiaryByBeneficiaryIdQuery,
    getBenefeciaryIdListForOwnerAndCenterQuery,
    getAllBeneficiaryDetailsQuery,
    selectBeneficiariesOfUnAssignedDevicesQuery
};