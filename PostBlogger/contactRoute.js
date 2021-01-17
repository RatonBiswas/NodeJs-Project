// import express from 'express'
const express = require('express')

// import * as contactController from './contactController.js'
const  {getAllContacts,createContact} = require('./contactController')

const router = express.Router();

router.get('/',getAllContacts)
router.post('/',createContact)
// router.get('/:id')
// router.put('/:id')
// router.delete('/:id')

module.exports = router
// export default router