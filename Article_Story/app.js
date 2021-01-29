require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const mongoose = require('mongoose')
// const session = require('express-session')

// const MongoDBStore = require('connect-mongodb-session')(session);
// const flash = require('connect-flash');


// var testConsole = require('debug')('app:test') //TODO Debugging purpose 
// var dbConsole = require('debug')('app:db') //TODO Debugging purpose

// testConsole('this is test console')//TODO Debugging purpose
// dbConsole('this is db console')//TODO Debugging purpose


// Import Middleware
// const {bindUserWithRequest} = require('./middleware/authMiddleware')
// const setLocals = require('./middleware/setLocals')
const setMiddleware = require('./middleware/middleware')

//Import Route
// const authRoutes = require('./routes/authRoute')
// const dashboardRoutes = require('./routes/dashboardRoute')
const setRoutes = require('./routes/routess')





//Playground routes
// const validatorRoutes = require('./playground/validator') // TODO should be removed


const app = express()


const MONGO_URL = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.xrfxu.mongodb.net/article-story?retryWrites=true&w=majority`

// const store = new MongoDBStore({
//     uri: MONGO_URL,
//     collection: 'sessions',
//     expires: 1000 * 60 * 60 * 2
//   });

// setup view engine
app.set('view engine','ejs')
app.set('views','views')

// middleware array 
// const middleware = [
//     morgan('dev'),
//     express.static('public'),
//     express.urlencoded({ extended:true}),
//     express.json(),
//     session({
//         secret : process.env.SECRET_KEY || 'SECRET_KEY', 
//         resave: false,
//         saveUninitialized: false,
//         store: store
//     }),
//     bindUserWithRequest(),
//     setLocals(),
//     flash()
// ]
// app.use(middleware)
//Using Routes from route Directory
setMiddleware(app)

//Using Routes from route Directory
setRoutes(app)

app.use((req, res,next) =>{
    let error = new Error('404 Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) =>{
    if(error.status === 404){
        return res.render('pages/error/404',
        {flashMessage:{}})
    }
    res.render('pages/error/500',
        {flashMessage:{}})

})

// app.use('/auth',authRoutes)
// app.use('/dashboard',dashboardRoutes)
// app.use('/playground',validatorRoutes) // TODO should be removed
// app.get('/'})


const PORT = process.env.PORT || 8000
mongoose.connect(MONGO_URL,
    {useNewUrlParser: true,
     useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Database connect successful');
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`);
        })
    })
    .catch(e=>{
        return console.log(e);
    })
