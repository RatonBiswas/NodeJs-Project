const express = require('express')
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/search',searchController.search);
router.get('/results',searchController.results);


module.exports = router;