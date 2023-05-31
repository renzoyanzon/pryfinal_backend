const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const{logger}= require('../../utils/logger/index.logger')

async function sendWhatsapp (msg){
    try {
        const message = await client.messages
        .create({
            body: msg,
            from: '+15075193767',
            to: '+542617085942'
        })

        logger.info(message.sid)

    } catch (err) {
        logger.error(err)
    }
    
}


module.exports = sendWhatsapp;