import express from 'express';
const router = express.Router();
import * as employeesController from '../controllers/employeesController.js'

router.get('',employeesController.getone)
router.get('/new',employeesController.getnew)
router.post('/new',employeesController.createEmployee)
router.get('/search',employeesController.getSearch)
router.get('/employees',employeesController.getEmployeeInfo)



export default router