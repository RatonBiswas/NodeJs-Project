const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//Import Route
const authRoutes = require('./routes/authRoute')


//Playground routes
const validatorRoutes = require('./playground/validator') // TODO should be removed


const app = express()
 


// setup view engine
app.set('view engine','ejs')
app.set('views','views')

// middleware array 
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended:true}),
    express.json()
]
app.use(middleware)

app.use('/auth',authRoutes)
app.use('/playground',validatorRoutes) // TODO should be removed


app.get('/', (req, res) =>{
    res.json({
        message: 'Hello User'
    })
})


const PORT = process.env.PORT || 8000
mongoose.connect('mongodb+srv://article-story:D9Jg2CKOc8jrn80X@cluster0.xrfxu.mongodb.net/article-story?retryWrites=true&w=majority',
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
