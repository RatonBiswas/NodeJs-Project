import express from 'express'

const app = express();

// server running port define
const port = process.env.PORT || 8000

// listening port
app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})