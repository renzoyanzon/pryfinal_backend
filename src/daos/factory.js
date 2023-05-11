require('dotenv').config();

const ProductsFsRepository = require('./repository/products/products.fs.repository');
const ProductsMongoRepository = require('./repository/products/products.mongo.repository');
const UsersMongoRepository = require('./repository/users/users.mongo.repository');


class UsersFactory{
    static getInstance(){
        if(process.env.DATA_STORAGE == 'FILE') return UsersMemRepository.getInstance('Users');
        return UsersMongoRepository.getInstance();
    }
}


class ProductsFactory{
    static getInstance (){
        if(process.env.DATACORE == 'FS') return ProductsFsRepository.getInstance('Products');
        return ProductsMongoRepository.getInstance();
    }
}


module.exports= {ProductsFactory,UsersFactory};