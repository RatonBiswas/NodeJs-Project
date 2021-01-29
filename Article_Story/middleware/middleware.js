require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')

const MONGO_URL = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.xrfxu.mongodb.net/article-story?retryWrites=true&w=majority`

const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended:true}),
    express.json(),
    session({
        secret : process.env.SECRET_KEY, 
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app =>{
    middleware.map(m=>{
        app.use(m)
    })
}