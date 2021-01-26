const express = require('express')
const morgan = require('morgan')

//Import Route
const authRoutes = require('./routes/authRoute')


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

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello User'
    })
})


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})