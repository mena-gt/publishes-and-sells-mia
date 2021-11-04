const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateColor = (name, hexValue) => {
    return joiConfig.joiValidateAsync (shemaColor, {
        name: name,
        hex: hexValue
    });
};

const shemaColor = Joi.object ({
    name: Joi.string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    hex: Joi.string ()
        .regex (/^#[A-Fa-f0-9]{6}/)
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        })
});

module.exports = {
    validateColor
};