const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateSignup = (fname, lname, email, passw, 
    repassw) => {
    return joiConfig.joiValidateAsync (shemaSignup, {
        firstName: fname,
        lastName: lname,
        email: email,
        password: passw,
        repassword: repassw
    });
};

const validateSignin = (email, password) => {
    return joiConfig.joiValidateAsync (shemaSignin, {
        email: email,
        password: password
    });
};

const shemaSignup = Joi.object ({
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
    repassword: Joi
        .ref ('password')
});

const shemaSignin = Joi.object ({
    email: Joi
        .string ()
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
});

module.exports = {
    validateSignin,
    validateSignup
};