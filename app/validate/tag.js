'use strict';
const tagValidationRule = {
    userid: {
        type: 'string',
        required: true,
        allowEmpty: false,
    },
    name: {
        type: 'string',
        required: true,
        allowEmpty: false,
        min: 1,
        max: 50,
    },
};

module.exports = {
    tagValidationRule,
};
