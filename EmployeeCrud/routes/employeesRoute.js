import express from 'express';
const router = express.Router();
import * as employeesController from '../controllers/employeesController.js'

router.get('/',employeesController.getone)
router.get('/new',employeesController.getnew)


export default router