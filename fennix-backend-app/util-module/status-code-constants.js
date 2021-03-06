const statusCodeConstants = {
    STATUS_NO_ROLES_FOR_ID: 211,
    STATUS_OK: 200,
    STATUS_DEVICE_UNLOCKED:240,
    STATUS_NO_CARDS_FOR_USER_ID: 207,
    STATUS_NO_TICKETS_FOR_USER_ID: 208,
    STATUS_NO_ROLES: 209,
    STATUS_NO_TIME_ZONE_DETAILS: 259,
    STATUS_NO_DROPDOWN: 218,
    STATUS_NO_BENEFICIARIES_FOR_ID: 222,
    // STATUS_NO_SIMCARD:222,
    STATUS_NO_CARRIERS_FOR_ID: 221,
    STATUS_NO_SIMCARD_TYPES_FOR_ID: 219,
    STATUS_NO_FILTERS_FOR_ID: 210,
    STATUS_NO_GROUPS_TYPES_FOR_ID: 220,
    STATUS_USER_AUTHENTICATED: 600,
    STATUS_EMAIL_PRESENT: 601,
    STATUS_EMAIL_NOT_PRESENT: 602,
    STATUS_USER_RETIRED: 603,
    STATUS_NO_SIMCARDS_FOR_ID: 212,
    STATUS_NO_DEVICES_FOR_ID: 213,
    STATUS_NO_CENTERS_FOR_ID: 214,
    STATUS_NO_COUNTRIES_FOR_ID: 216,
    STATUS_NO_DEVICE_TYPES_FOR_ID: 217,
    STATUS_NO_BENEFICIARY_FOR_ID: 222,
    STATUS_PASSWORD_INCORRECT: 604,
    STATUS_POSTGRES_CONNECTION_ERROR: 700,
    STATUS_MONGO_CONNECTION_ERROR: 701,
    // Success status codes
    STATUS_BENEFICIARY_ADDED_SUCCESS: 250,
    STATUS_BENEFICIARY_EDIT_SUCCESS: 251,
    STATUS_BENEFICIARY_DEACTIVATE_SUCCESS: 252,
    STATUS_BENEFICIARY_DOC_UPLOAD_SUCCESS: 253,
    STATUS_DEVICE_ADD_SUCCESS: 254,
    STATUS_SIM_CARD_ADD_SUCCESS: 255,
    STATUS_CARRIER_ADD_SUCCESS: 256,
    STATUS_ASSIGN_DEVICE_SUCCESS: 257,
    STATUS_DELINK_DEVICE_SUCCESS: 258,
    STATUS_DEVICE_ALREADY_EXISTS_FOR_GIVEN_IMEI: 260,
    STATUS_CONTAINER_ADDED_SUCCESS: 259,
    STATUS_NO_LOCATION_EXISTS_FOR_GIVEN_ID: 261

};

module.exports = {statusCodeConstants};
