const express = require('express')

const app = express()


app.get('/', (req, res) =>{
    res.json('Hello User')
})


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})