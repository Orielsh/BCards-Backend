const Joi = require('joi')

const validationOptions = {
    stripUnknown: true,
    abortEarly: false,
}

const schemas = {
    login:
        Joi.object().keys({
            email: Joi.string().email().required(),
            // password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
            password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).required(),
        }).options(validationOptions),
}

module.exports = schemas;