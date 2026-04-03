const express = require("express");
const router = express.Router();
const{handleRegisterUser, handleLoginUser} = require("../controller/user")

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);


module.exports = router;