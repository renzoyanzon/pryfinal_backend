const router = require('express').Router();

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT,
        port: 8080,
        pid: process.pid,
        health: '!Up'
    })
})


module.exports = router;