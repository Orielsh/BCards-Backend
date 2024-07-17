const Joi = require('joi')

const validationOptions = {
  stripUnknown: true,
  abortEarly: false,
}

const schemas = {
  createNewUser:
    Joi.object().keys({
      name: Joi.object().keys({
        first: Joi.string().required(),
        middle: Joi.string().optional().default(""),
        last: Joi.string().required(),
      }).required(),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number' }).required(),
      email: Joi.string().email().required(),
      // password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
      password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).required(),
      image: Joi.object().keys({
        url: Joi.string().uri().required(),
        alt: Joi.string().optional().default("Profile image"),
      }).required(),
      address: Joi.object().keys({
        state: Joi.string().optional(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.string().required(),
      }).required(),
      isBusiness: Joi.boolean().required(),
    }).options(validationOptions),

  putUser:
    Joi.object().keys({
      name: Joi.object().keys({
        first: Joi.string().required(),
        middle: Joi.string().optional().default(""),
        last: Joi.string().required(),
      }).required(),
      phone: Joi.string().pattern(/^05\d{1}([-]{0,1})\d{7}$/, { name: 'cellphone number' }).required(),
      image: Joi.object().keys({
        url: Joi.string().uri().required(),
        alt: Joi.string().optional().default("Profile image"),
      }).required(),
      address: Joi.object().keys({
        state: Joi.string().optional(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.string().required(),
      }).required(),
    }).options(validationOptions),

  patchUser:
    Joi.object().keys({
      isBusiness: Joi.boolean().required(),
    }).options(validationOptions),
}

module.exports = schemas;