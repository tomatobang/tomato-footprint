'use strict';
const footprintValidationRule = {
    userid: {
        type: 'string',
        required: true,
        allowEmpty: false,
    },
    position: {
        type: 'string',
        required: true,
        allowEmpty: false,
        min: 1,
        max: 50,
    },
};

module.exports = {
    footprintValidationRule,
};
