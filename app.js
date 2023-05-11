const express= require('express');
const app = express();

const indexLoader = require('./src/loaders/index.loader');

async function initLoaders(){
    await indexLoader(app);
}
initLoaders();

module.exports= app