var express = require("express");
var router = express.Router();
const { check } = require('express-validator')
const { signout, signup } = require("../controllers/auth");

router.post("/signup", [
    check("name","Name should be at least 3 char").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password", "min length == 3").isLength({min: 3})
],signup);
router.get("/signout", signout);

module.exports = router;
