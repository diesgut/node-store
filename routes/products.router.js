const express = require("express");
const productsServices = require("../services/products.services");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router=express.Router();


router.get("/", async (req, res) =>{
    const products=await productsServices.all();
    res.json(products);
});

router.get("/:id",
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) =>{
    try {
        //  const productId=req.params.id;
        const { id }=req.params;
        //todos los parametros enviados por url params, seran recibidos como string
        const product=await productsServices.findById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("/",
    validatorHandler(createProductSchema, 'body'),
    async (req, res) =>{

        const body=req.body;
        const product=await productsServices.create(body);
        res.status(201).json({
            message: 'created',
            data: product
        });
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
        const product=await productsServices.update(id, req.body);
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
        const rpta = await productsServices.delete(productId);
        res.json(rpta);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
