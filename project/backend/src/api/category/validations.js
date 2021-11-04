const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateCategory = (name, description, parent) => {
    return joiConfig.joiValidateAsync (shemaCategory, {
        name: name,
        description: description,
        parent: parent
    });
};

const shemaCategory = Joi.object ({
    name: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    description: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    parent: Joi
        .number ()
        .integer ()
        .empty ()
        .optional ()
        .messages ({
            'number.integer': 'The field must be integer type.'
        })
});

module.exports = {
    validateCategory
};