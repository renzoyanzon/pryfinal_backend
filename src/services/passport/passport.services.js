const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const UserModel = require('../../daos/models/user.model');
const md5 =require('md5');

const sendEmail = require('../nodeMailer/nodeMailer.services');
const sendWhatsapp= require('../twilio/whattsapp.services');

//seteamos la configuracion de passport
passport.use('login', new LocalStrategy(async (username,password,done)=>{
    try {
        const checkUser = await userServices.passwordCheck(username, password);
        if(!checkUser){
            console.error('Passpor: wrong password');
            return done(null,false,{message: 'Passport: wrong password'})
        }

        const userData = await userServices.getByUserName( username );
        if(!userData){
            console.error('Passpor: User not found')
            return done(null,false,{message: 'Passport: user not found'});
        }
        console.info(`Passport : user ${username} logged successufully`)
        return done(null, userData, {message: 'Login successfull'})
        
    } catch (err) {
        console.error(`Passport error: ${err}`);
        return done(null,false,{message: `Passport error: ${err}`})
    }


   
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req,username,_password,done)=>{

    try {
        const data = await userServices.getByUserName(username);
        if(data){
            console.error(`Passport: user ${username} already exists`);
            return done(null,false, {message: `Passport: user ${username} already exists`})
        }
        const newUser = await userServices.append(req.body);
        if(!newUser){
            console.error('Passport: Error apending new user');
            return done(null,false, {message: 'Passport: Error apending new user'})
        }
        
        console.info(`Passport: User ${username} created successsfully`)
        
        //sendWhatsapp(JSON.stringify(newUser));
        sendEmail(JSON.stringify(newUser))
    
        return done(null,newUser,{message:`Passport: User ${username} created successsfully` })

    } catch (err) {
        done(null, err,{message: `Passport error: ${err}`});
    }

    
}
));

passport.serializeUser((user,done)=>{
    done(null, user._id);
});

passport.deserializeUser(async (_id,done)=>{
    const userData = await userServices.getById(_id);
    done(null,userData);
});

module.exports = passport;