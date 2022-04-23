const express = require("express");
const categoriesService = require("../services/categories.services");

const router=express.Router();

router.get("/", (req, res) =>{
    res.send("categories");
});

module.exports = router;