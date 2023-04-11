const express= require('express');
const indexRouter = require('./src/routes/index')
const mongooseConnect = require('./src/services/mongo/connect')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongooseConnect();


app.use('/api',indexRouter)

module.exports= app