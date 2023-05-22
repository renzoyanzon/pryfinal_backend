const router = require('express').Router();

const PagesRouter = require('./pages/pages.routes')
const ProductsRouter = require('./products/products.routes');
const sessionRouter = require('./session/session.routes')

class Router {
    constructor(){

        router.get('/health',(_req,res)=>{
            res.status(200).json({
                success: true,
                environment: process.env.ENVIRONMENT,
                port: 8080,
                pid: process.pid,
                health: '!Up'
            })
        })

        //Autentication router
        router.use('/api/auth', sessionRouter);

        //Client HTML Router
        router.use(('/'),(new PagesRouter).start());

        //API Routers
        router.use('/api/products',(new ProductsRouter).start());

        return router
    }

    static getInstance(){
        if(!this.instance){
            this.instance= new Router();
        }
        return this.instance
    }
}



module.exports = Router;