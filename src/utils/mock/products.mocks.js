const supertest= require('supertest');
require('dotenv').config();

const PORT = process.env.PORT || '8080';
const request = supertest(`http://localhost:${PORT}`)

const generator = require('./mock.utils');

const {logger} = require('../logger/index.logger');

const productMockGenerator = async (qty)=>{
    try {
        for(let i=0 ; i< qty; i++){
            let randomProduct = generator.get();
            const test = await request.post('/api/products').set('Accept','application/json').send(randomProduct)
        }
        logger.info(`Mock: ${qty} products created`)
    } catch (err) {
        logger.error(`Mock: Error creating products ${err}`)
    }
}

module.exports = productMockGenerator;