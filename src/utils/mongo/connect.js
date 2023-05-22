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


/* const mongooseConnect = async ()=>{
    let MONGO_URI;
    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASSWORD= process.env.MONGO_PASSWORD;
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME
    const MONGO_HOST= process.env.MONGO_HOST;
    const MONGO_QUERY= process.env.MONGO_QUERY;

    if(!MONGO_USER){
        MONGO_URI= `${process.env.MONGO_URI}/${MONGO_DB_NAME}`
    } else{
        MONGO_URI= `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}/test`
    }

    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(MONGO_URI)
        console.info('Mongoose connected');
        
    } catch (err) {
        throw new Error(err);
    }
}
 */
module.exports = MongooseConnect;