const router = require('express').Router();


router.get('/',(_req,res)=>{
    res.render('pages/home')
});


module.exports= router;