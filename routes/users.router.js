const express = require("express");
const usersService = require("../services/users.services");

const router=express.Router();

router.get("/", (req, res) =>{
    res.send("users");
});

module.exports = router;