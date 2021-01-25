const express = require('express')
const morgan = require('morgan')

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

app.get('/', (req, res) =>{
    res.render('pages/auth/signup',{title: 'create a new account'})
    res.json('Hello User')
})


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})