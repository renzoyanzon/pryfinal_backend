const dotenv = require('dotenv');
const path =  require('path');

dotenv.config({
    path: path.resolve(process.cwd(), './src/config/development' + '.env')
})
