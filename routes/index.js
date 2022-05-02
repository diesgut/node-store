const express = require("express");

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customerRouter = require('./customer.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
    const router=express.Router();
    app.use('/api/v1', router); //generamos un path global para los endpoints que se encuentran abajo

    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/customers', customerRouter);
    router.use('/orders', ordersRouter);
}

module.exports=routerApi;
