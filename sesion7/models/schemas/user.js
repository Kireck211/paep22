const Joi = require('joi');

const updateSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30),
  lastName: Joi.string()
    .min(3)
    .max(30),
  username: Joi.string()
    .min(6)
    .max(30)
    .required()
});

const createSchema = updateSchema.concat(Joi.object({
  name: Joi.required(),
  lastName: Joi.required()
}))

module.exports = {updateSchema, createSchema};