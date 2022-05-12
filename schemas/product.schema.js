const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(1);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(1);

const orderId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  categoryId: categoryId.required()
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  productId: id.required(),
	orderId: orderId.required(),
  quantity: Joi.number().integer().min(1).required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min: price,
  price_max: price.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, addItemSchema, queryProductSchema }
