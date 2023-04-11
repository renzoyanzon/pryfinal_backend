const app = require('./app');
require('dotenv').config()

const PORT = process.env.PORT;



app.listen(PORT,()=> console.info(`Server up and running on port ${PORT}`))