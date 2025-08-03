const Joi = require('joi');

const RegisterSchema = Joi.object({

    name: Joi.string().min(3).max(30),

    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email(),

    companyName: Joi.string()
})


const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),

  username: Joi.string().alphanum().min(3).max(30),

  companyName: Joi.string().min(2).max(50),

  gender: Joi.string().valid("male", "female", "other"),

  street: Joi.string().allow(""),

  district: Joi.string().allow(""),

  state: Joi.string().allow(""),

  pincode: Joi.string().length(6),

  country: Joi.string().allow("")
});

module.exports = {RegisterSchema, updateSchema}

