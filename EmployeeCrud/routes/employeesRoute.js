import express from 'express';
const router = express.Router();
import * as employeesController from '../controllers/employeesController.js'

router.get('/',employeesController.getone)

export default router