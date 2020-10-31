import express from 'express'
const router = express.Router();
import * as imageController from '../controllers/imageController.js'


router.get('/upload',imageController.uploadFile);

export default router;