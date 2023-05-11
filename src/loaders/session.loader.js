const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const { getStoreConfig } = require('../config/mongo.config');
const passportService= require('../../src/services/passport/passport.services')
require('dotenv').config();

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'undefined';

const sessionLoader = async (app)=>{
    app.use(cookieParser(COOKIE_SECRET));
    app.use(session({
        store:  MongoStore.create(getStoreConfig()),
        secret: COOKIE_SECRET,
        resave: true,
        saveUninitialized: true
    }))

    app.use(passportService.initialize());
    app.use(passportService.session());

    return app;
}

module.exports = sessionLoader;