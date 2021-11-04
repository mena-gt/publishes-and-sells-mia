const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateProfileInfo = (fname, lname, gender, phone, 
    address) => {
    return joiConfig.joiValidateAsync (shemaProfileInfo, {
        firstName: fname,
        lastName: lname,
        gender: gender,
        phoneNumber: phone,
        address: address
    });
};

const validateChangePassword = (oPassw, nPassw, reNewPassw) => {
    return joiConfig.joiValidateAsync (shemaChangePassword, {
        oldPassword: oPassw,
        newPassword: nPassw,
        reNewPassword: reNewPassw
    });
};

const validateChangeEmail = (oEmail, nEmail) => {
    return joiConfig.joiValidateAsync (shemaChangeEmail, {
        oldEmail: oEmail,
        newEmail: nEmail
    });
};

const shemaProfileInfo = Joi.object ({
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
    phoneNumber: Joi
        .string ()
        .empty ()
        .optional (),
    address: Joi
        .string ()
        .empty ()
        .optional ()
});

const shemaChangePassword = Joi.object ({
    oldPassword: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    newPassword: Joi
        .string ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    reNewPassword: Joi
        .ref ('newPassword')
});

const shemaChangeEmail = Joi.object ({
    oldEmail: Joi
        .string ()
        .email ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        }),
    newEmail: Joi
        .string ()
        .email ()
        .required ()
        .messages ({
            'any.required': 'This field is required.',
            'string.empty': 'This field is required.'
        })
});



module.exports = {
    validateChangeEmail,
    validateChangePassword,
    validateProfileInfo
};