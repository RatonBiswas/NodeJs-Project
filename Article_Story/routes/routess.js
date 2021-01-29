const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')

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
        path: '/',
        handler: (req, res) =>{
            res.json({
                message: 'Hello User'
            })
        }
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
