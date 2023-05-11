const expressLoader = require('./express.loader');
const routerLoader= require('./router.loader');
const sessionLoader = require('./session.loader')

const indexLoader = async (app)=>{
    await expressLoader (app);
    console.info('Loaders: Express Initialized');
    await sessionLoader (app);
    console.info('Loaders: Session Initialized')
    await routerLoader(app);
    console.info('Loaders: Router Initialized');
    
};

module.exports = indexLoader;