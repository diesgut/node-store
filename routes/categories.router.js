const express = require("express");
const { createCategorySchema } = require("../schemas/category.schema");
const categoryService = require("../services/category.service");
const validatorHandler = require("../middlewares/validator.handler");

const router=express.Router();

router.get("/", async (req, res) =>{
  const categories=await categoryService.all();
  res.json(categories);
});

router.post("/",
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) =>{
      try {
        const body=req.body;
        const customer=await categoryService.create(body);
        res.status(201).json({
            message: 'created',
            data: customer
        });
      } catch (error) {
        next(error);
    }
});

module.exports = router;
