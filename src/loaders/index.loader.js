const expressLoader = require('./express.loader');
const routerLoader= require('./router.loader');
const sessionLoader = require('./session.loader');
const graphqlLoader = require('./graphql.loader');

const indexLoader = async (app)=>{
    await expressLoader (app);
    console.info('Loaders: Express Initialized');
    await sessionLoader (app);
    console.info('Loaders: Session Initialized')
    await routerLoader(app);
    console.info('Loaders: Router Initialized');
    await graphqlLoader( app );
    console.info('Loaders: GraphQL Initialized');
};

module.exports = indexLoader;