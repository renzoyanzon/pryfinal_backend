const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

router.post('/signup', passport.authenticate('signup',{failureRedirect:'/error'}) ,async (req,res)=>{
    console.log("info",`El usuario ${req.user.fullname} se ha registrado correctamente`);
    res.redirect('/home');
});

router.post('/signin',passport.authenticate('login',{failureRedirect:'/error'}) ,async (req,res)=>{
    console.log("info",`El usuario ${req.user.fullname} ha ingresado session`);
    res.redirect('/home');
})

router.get('/signout',(req,res)=>{
    console.log("info",`El usuario ${req.user.fullname} ha salido de la session`);
    req.logout(()=>{
        res.redirect('/signin');
    })
    
});


module.exports = router;