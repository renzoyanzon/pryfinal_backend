const router = require('express').Router();

const pagesRouter = require('./pages/pages.routes')
const productsRouter = require('./products/products.routes')

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT,
        port: 8080,
        pid: process.pid,
        health: '!Up'
    })
})

.use(pagesRouter)
.use('/api/products',productsRouter)


module.exports = router;