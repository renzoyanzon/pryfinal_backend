const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../mongo/user.model');
const md5 =require('md5');

const sendEmail = require('../nodeMailer/nodeMailer.services');
const sendWhatsapp= require('../twilio/whattsapp.services');

//seteamos la configuracion de passport
passport.use('login', new LocalStrategy(async (username,password,done)=>{
    const userData = await UserModel.findOne({username,password:md5(password)});
    if(!userData){
        return done(null,false);
    }
    done(null, userData)
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req,username,password,done)=>{

    try {
        const userData = await UserModel.findOne({username,password:md5(password)});
    if(userData){
        return done(null,false)
    }
    const stageUser = new UserModel({
        username,
        password: md5(password),
        fullname: req.body.fullname,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
        avatar: undefined
    });
    const newUser = await stageUser.save();
   
    sendWhatsapp(JSON.stringify(newUser));
    sendEmail(JSON.stringify(newUser))
    
    done(null,newUser)

    } catch (err) {
        done(null, false);
    }

    
}
));

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser(async (id,done)=>{
    const userData = await UserModel.findById(id);
    done(null,userData);
});

module.exports = passport;