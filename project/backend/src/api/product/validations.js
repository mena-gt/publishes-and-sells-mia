const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateProduct = (name, description, parent) => {
    return joiConfig.joiValidateAsync (shemaProduct, {
        name: name,
        description: description,
        parent: parent
    });
};

const shemaProduct = Joi.object ({
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
});

module.exports = {
    validateProduct
};