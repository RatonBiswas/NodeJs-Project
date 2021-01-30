const express = require("express");
const router = express.Router();

// middleware Controllers
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

//contollers
const {
    uploadProfilePics,
  } = require("../controllers/uploadControler");

router.use(isAuthenticated)

router.post("/profilePics",upload.single('profilePics'),uploadProfilePics);



module.exports = router;
