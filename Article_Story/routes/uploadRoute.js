const express = require("express");
const router = express.Router();

// middleware Controllers
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

//contollers
const {
    uploadProfilePics,
    removeProfilePics
  } = require("../controllers/uploadControler");

router.use(isAuthenticated)

router.delete('/profilePics',removeProfilePics)

router.post("/profilePics",upload.single('profilePics'),uploadProfilePics);



module.exports = router;
