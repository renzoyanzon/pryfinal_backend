const mongoose = require('mongoose');
require('dotenv').config();
const {getMongoConfig} = require('../../config/mongo.config');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comercio';

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
        console.info("Initiating Mongo Connection");
        try {
            mongoose.set('strictQuery', false);
            const response = await mongoose.connect(MONGO_URI,getMongoConfig());
            if(response) console.info('Mongoose connected succesfully')
        } catch (err) {
            console.error(err)
        }

    }
}


module.exports = MongooseConnect;