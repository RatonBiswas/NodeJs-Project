import express from 'express';
const router = express.Router();
import * as employeesController from '../controllers/employeesController.js'

router.get('/',employeesController.getone)
router.get('/new',employeesController.getnew)
router.post('/new',employeesController.createEmployee)
router.get('/search',employeesController.getSearch)
router.get('/employees',employeesController.getEmployeeInfo)
router.get('/edit/:id',employeesController.getUpdateView)
router.put('/edit/:id',employeesController.getUpdate)
router.post('/delete/:id',employeesController.deleteOne)



export default router