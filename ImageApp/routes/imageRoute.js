import express from 'express'
const router = express.Router();
import * as imageController from '../controllers/imageController.js'


router.get('/upload',imageController.uploadFile);
router.get('/',imageController.allFile);

export default router;