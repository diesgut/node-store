const express = require("express");
const userService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');

const router=express.Router();

router.get("/", async (req, res) =>{
  const users=await userService.all();
  res.json(users);
});

router.get("/:id",
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) =>{
    try {
        const { id }=req.params;
        const product=await userService.findById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("/",
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) =>{
      try {
        const body=req.body;
        const product=await userService.create(body);
        res.status(201).json({
            message: 'created',
            data: product
        });
      } catch (error) {
        next(error);
    }
});

router.patch("/:id",
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) =>{
    try {
        const id=req.params.id;
        const product=await userService.update(id, req.body);
        res.json({
            message: 'update partial',
            data: product,
            id
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) =>{
  try {
      const userId=req.params.id;
      const rpta = await userService.delete(userId);
      res.json(rpta);
  } catch (error) {
      next(error);
  }
});

module.exports = router;
