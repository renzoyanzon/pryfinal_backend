require('dotenv').config();

const ProductsFsRepository = require('./repository/products/products.fs.repository');
const ProductsMongoRepository = require('./repository/products/products.mongo.repository');



class ProductsFactory{
    static getInstance (){
        if(process.env.DATACORE == 'FS') return ProductsFsRepository.getInstance('Products');
        return ProductsMongoRepository.getInstance();
    }
}


module.exports= {ProductsFactory};