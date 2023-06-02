const {loggerHttp} = require('../utils/logger/index.logger');
const morgan = require('morgan');

const loggerLoader = ( app ) => {

    app.use(loggerHttp);
    //app.use(morgan('dev'));

    return app;
}

module.exports = loggerLoader;