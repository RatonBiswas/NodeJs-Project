const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const uploadRoute = require('./uploadRoute')
const postRoute = require('./postRoute')
// const playground = require('../playground/play')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/upload',
        handler: uploadRoute
    },
    {
        path: '/posts',
        handler: postRoute
    },
    // {
    //     path: '/playground',
    //     handler: playground
    // },
    {
        path: '/',
        handler: dashboardRoute
        // handler: (req, res) =>{
        //     res.json({
        //         message: 'Hello User'
        //     })
        // }
    },
]

module.exports = app =>{
    routes.map(r=>{
        if(r.path ==='/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}
