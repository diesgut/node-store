const express = require("express");
const productServices = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema, addItemSchema } = require('./../schemas/product.schema');

const router=express.Router();


router.get("/", async (req, res) =>{
    const products=await productServices.all();
    res.json(products);
});

router.get("/:id",
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) =>{
    try {
        //  const productId=req.params.id;
        const { id }=req.params;
        //todos los parametros enviados por url params, seran recibidos como string
        const product=await productServices.findById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("/",
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) =>{
      try {
        const body=req.body;
        const product=await productServices.create(body);
        res.status(201).json({
            message: 'created',
            data: product
        });
      } catch (error) {
          next(error);
      }
});

//en un metodo put se deben enviar todos los atributos del producto
router.put("/:id",
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) =>{
    try {
        const productId=req.params.id;
        const body=req.body;
        res.json({
            message: 'update',
            data: body,
            productId
        });
    } catch (error) {
        next(error);
    }
});

//en un metodo path se pueden enviar algunos de los atributos del producto
router.patch("/:id",
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) =>{
    try {
        const id=req.params.id;
        const product=await productServices.update(id, req.body);
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
        const productId=req.params.id;
        const rpta = await productServices.delete(productId);
        res.json(rpta);
    } catch (error) {
        next(error);
    }
});

router.post("/add-item",
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) =>{
      try {
        const body=req.body;
        const productItem=await productServices.addItem(body);
        res.status(201).json({
            message: 'created',
            data: productItem
        });
      } catch (error) {
          next(error);
      }
});

module.exports = router;
