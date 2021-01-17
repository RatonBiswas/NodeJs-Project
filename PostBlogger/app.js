// import express from 'express'
// import morgan from 'morgan'
const express = require('express')
const morgan = require('morgan')


const contactRoute = require('./contactRoute') 
// import contactRoute from './contactRoute.js'





const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/contacts',contactRoute)

app.get('*',(req,res) => {
    res.send('<h1>Please use the  correct route</h1>')
})

// server running port define
const port = process.env.PORT || 8000

// listening port
app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})