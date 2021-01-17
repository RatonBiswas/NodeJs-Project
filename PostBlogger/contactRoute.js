// import express from 'express'
const express = require('express')

// import * as contactController from './contactController.js'
const  {getAllContacts,createContact,getConstactsById,updateContact,deleteContact} = require('./contactController')

const router = express.Router();

router.get('/',getAllContacts)
router.post('/',createContact)
router.get('/:id',getConstactsById)
router.put('/:id',updateContact)
router.delete('/:id',deleteContact)

module.exports = router
// export default router