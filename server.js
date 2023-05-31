const app = require('./app');
require('dotenv').config()

const PORT = process.env.PORT;

const {logger}= require('./src/utils/logger/index.logger')



app.listen(PORT,()=> logger.info(`Server up and running on port ${PORT}`))