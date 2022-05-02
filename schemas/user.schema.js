const Joi = require('joi');

const id = Joi.number().integer().min(1);
const email = Joi.string().email();
const password = Joi.string().min(4);
const role = Joi.string().min(4);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema}
