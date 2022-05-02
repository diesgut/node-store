const express = require("express");
const { createCustomerSchema } = require("../schemas/customer.schema");
const customerService = require("../services/customer.service");
const validatorHandler = require("../middlewares/validator.handler");

const router=express.Router();

router.get("/", async (req, res) =>{
  const categories=await customerService.all();
  res.json(categories);
});

router.post("/",
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) =>{
      try {
        const body=req.body;
        const customer=await customerService.create(body);
        res.status(201).json({
            message: 'created',
            data: customer
        });
      } catch (error) {
        next(error);
    }
});

module.exports = router;
