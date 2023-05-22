const express = require('express');
const compression = require ('compression');
const cors = require('cors');
require('dotenv').config();

const environment = process.env.ENVIRONMENT || 'development';

const expressLoader = async (app)=>{
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    if(environment == 'development') app.use(cors());

    app.set('view engine','ejs');
    app.set('views','./views/pages');
    app.use('/uploads', express.static('public/images'));

    return app;
}

module.exports = expressLoader;