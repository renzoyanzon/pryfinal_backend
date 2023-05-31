const expressLoader = require('./express.loader');
const routerLoader= require('./router.loader');
const sessionLoader = require('./session.loader');
const graphqlLoader = require('./graphql.loader');
const loggerLoader = require('./logger.loader');

const {logger} = require('../utils/logger/index.logger')

const indexLoader = async (app)=>{
    loggerLoader( app );
    logger.info('Loaders: Loggers Initialized');
    await expressLoader (app);
    logger.info('Loaders: Express Initialized');
    await sessionLoader (app);
    logger.info('Loaders: Session Initialized')
    await routerLoader(app);
    logger.info('Loaders: Router Initialized');
    await graphqlLoader( app );
    logger.info('Loaders: GraphQL Initialized');
};

module.exports = indexLoader;