const express= require('express');
const indexRouter = require('./src/routes/index')
const mongooseConnect = require('./src/services/mongo/connect')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongooseConnect();


app.set('view engine','ejs');
app.set('views','./views');



app.use(indexRouter)

module.exports= app