const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

const {logger}= require('../../utils/logger/index.logger')

router.post('/signup', 
    passport.authenticate('signup',{failureRedirect:'/error'}) ,
    async (req,res)=>{
    logger.info(`El usuario ${req.user.fullname} se ha registrado correctamente`);
    res.redirect('/');
});

router.post('/signin',
    passport.authenticate('login',{failureRedirect:'/error'}) ,
    async (req,res)=>{
        logger.info(`El usuario ${req.user.fullname} ha ingresado session`);
        res.redirect('/');
})

router.get('/signout',(req,res)=>{
    logger.info(`El usuario ${req.user.fullname} ha salido de la session`);
    req.logout(()=>{
        res.redirect('/signin');
    })
    
});


module.exports = router;