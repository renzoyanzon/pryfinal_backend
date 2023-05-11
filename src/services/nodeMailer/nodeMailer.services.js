const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (msg) => {

  
    const transportOptions = {
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    };   
    const transporter = nodemailer.createTransport(transportOptions);
    
    try{
        const emailOptions = {
            from: 'Ecommerce app',
            to: process.env.EMAIL_USER,
            subject: 'New account created!',
            html: `<h1>Congratulations for your new account!</h1>
                   <p>${msg}</p>` 
                  
        }

        const result = await transporter.sendMail(emailOptions);
        console.info(result)
    } catch (err) {
        console.err(err);
    }
}

module.exports = sendEmail;


