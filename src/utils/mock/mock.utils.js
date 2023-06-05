const {faker}= require('@faker-js/faker');
const axios = require('axios');

const {logger} = require('../logger/index.logger')

const get =  () =>({
    
    name: faker.commerce.product(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    thumbnail: getImage(),
    stock: faker.random.number({min:0, max:200}),
   
});

const getImage=()=>{
    try {
        const response = axios.get('https://source.unsplash.com/random');
    
        return response.request.res.responseUrl;
    
    } catch (err) {
        logger.error(`mock utils: getImage error: ${err}`)
    }
   
} 

module.exports= {get}
