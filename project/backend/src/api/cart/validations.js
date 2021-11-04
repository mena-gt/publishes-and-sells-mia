const Joi = require ('joi');
const { joiConfig } = require ('../../utils');


const validateCart = (name, description, parent) => {
    return joiConfig.joiValidateAsync (shemaCart, {
        name: name,
        description: description,
        parent: parent
    });
};

const shemaCart = Joi.object ({
    name: Joi.string ()
             .required ()
             .messages ({
                 'any.required': 'This field is required.',
                 'string.empty': 'This field is required.'
             }),
    description: Joi.string ()
                    .required ()
                    .messages ({
                        'any.required': 'This field is required.',
                        'string.empty': 'This field is required.'
                    }),
    parent: Joi.number ()
              .integer ()
              .optional ()
              .messages ({
                  'number.integer': 'The field must be integer type.'
              })
});

module.exports = {
    validateCart
};