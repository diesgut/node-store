const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(1);

const orderId = Joi.number().integer();

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

module.exports = { createProductSchema, updateProductSchema, getProductSchema, addItemSchema}
