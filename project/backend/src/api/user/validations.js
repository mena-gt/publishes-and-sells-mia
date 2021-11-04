const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateUser = (fname, lname, gender, email, 
    passw, role) => {
    return joiConfig.joiValidateAsync (shemaUser, {
        firstName: fname,
        lastName: lname,
        gender: gender,
        email: email,
        password: passw,
        role: role
    });
};

const shemaUser = Joi.object ({
    firstName: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    lastName: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    gender: Joi
        .string ()
        .length (1)
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    email: Joi
        .string ()
        .email ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    password: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    role: Joi
        .number ()
        .integer ()
        .messages ({
            'number.integer': 'The field must be integer type.'
        })
});

module.exports = {
    validateUser
};