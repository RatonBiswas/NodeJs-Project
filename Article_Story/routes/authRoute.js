const express = require("express");
const router = express.Router();

// validator controllers
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");


// Auth Controllers
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");




//Route handlers
router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginValidator,loginPostController);

router.post("/logout", logoutController);

module.exports = router;
