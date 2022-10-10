const express = require("express");
const { UserRegister,loginUser } = require("../controllers/authController");
const router = express.Router();

router.post('/register',UserRegister);
router.post('/login',loginUser);


module.exports=router
