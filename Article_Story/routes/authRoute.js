const express = require("express");
const router = express.Router();

// validator controllers
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");

// import Middleware
const {unAuthenticated} = require("../middleware/authMiddleware")


// Auth Controllers
const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");




//Route handlers
router.get("/signup", unAuthenticated,signupGetController);
router.post("/signup", unAuthenticated,signupValidator, signupPostController);

router.get("/login", unAuthenticated,loginGetController);
router.post("/login", unAuthenticated,loginValidator,loginPostController);

router.get("/logout", logoutController);

module.exports = router;
