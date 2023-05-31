const mongoose = require('mongoose');
require('dotenv').config();
const {getMongoConfig} = require('../../config/mongo.config');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comercio';

const {logger} = require('../logger/index.logger');

class MongooseConnect {
    constructor(){
        this.initConnection();
    }

    static getInstance (){
        if(!this.instance){
            this.instance= new MongooseConnect()
        }
        return this.instance
    }

    async initConnection(){
        logger.info("Initiating Mongo Connection");
        try {
            mongoose.set('strictQuery', false);
            const response = await mongoose.connect(MONGO_URI,getMongoConfig());
            if(response) logger.info('Mongoose connected succesfully')
        } catch (err) {
            logger.error(err)
        }

    }
}


module.exports = MongooseConnect;