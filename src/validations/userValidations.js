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

module.exports = {RegisterSchema}

