const express = require("express");
const router = express.Router();


//contollers 
const {dashboardGetController} = require("../controllers/dashboardController")

// middleware Controllers
const {isAuthenticated} = require("../middleware/authMiddleware")


// Routes 
router.get('/',isAuthenticated,dashboardGetController)

module.exports = router;