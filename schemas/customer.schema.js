const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./user.schema');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(1).max(10);
const lastName = Joi.string().min(1).max(10);
const phone = Joi.string();
const userId = Joi.number().integer().min(1);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name: name.required(),
  lastname: lastName.required(),
  phone: phone.required(),
  user: updateUserSchema
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema}
