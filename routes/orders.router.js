const express = require('express');

const orderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {getOrderSchema, createOrderSchema} = require('../schemas/order.schema');

const router = express.Router();

router.get("/", async (req, res) =>{
  const orders = await orderService.all();
  res.json(orders);
});

router.get('/:id',
	validatorHandler(getOrderSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await orderService.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createOrderSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newOrder = await orderService.create(body);
			res.status(201).json({ newOrder });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
