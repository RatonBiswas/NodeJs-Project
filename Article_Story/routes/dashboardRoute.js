const express = require("express");
const router = express.Router();

//contollers
const {
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController
} = require("../controllers/dashboardController");

// middleware Controllers
const { isAuthenticated } = require("../middleware/authMiddleware");

const profileValidator = require('../validator/dashboard/profileValidator')

// Routes

router.get("/", isAuthenticated, dashboardGetController);

router.get("/create-profile",isAuthenticated,createProfileGetController);
router.post("/create-profile",isAuthenticated,profileValidator,createProfilePostController);

router.get("/edit-profile",isAuthenticated,editProfileGetController);
router.post("/edit-profile",isAuthenticated,editProfilePostController);

module.exports = router;
