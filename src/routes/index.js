const router = require('express').Router();

const PagesRouter = require('./pages/pages.routes')
const ProductsRouter = require('./products/products.routes');


router.get('/health',(_req,res)=>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT,
        port: 8080,
        pid: process.pid,
        health: '!Up'
    })
})

router.use(('/'),(new PagesRouter).start());
router.use('/api/products',(new ProductsRouter).start());

class Router {
    constructor(){
        return router
    }
}


module.exports = Router;