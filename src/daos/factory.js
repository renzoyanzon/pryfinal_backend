require('dotenv').config();

const ProductsFsRepository = require('./repository/products/products.fs.repository');
const ProductsMongoRepository = require('./repository/products/products.mongo.repository');

const UsersMongoRepository = require('./repository/users/users.mongo.repository');
const UsersFsRepository = require('./repository/users/users.fs.repository');

const CartMongoRepository =  require('./repository/cart/cart.mongo.repository');
const CartFsRepository = require('./repository/cart/cart.fs.repository');

class UserFactory{
    static getInstance(){
        if(process.env.DATA_STORAGE == 'FILE') return UsersFsRepository.getInstance('Users');
       
        return UsersMongoRepository.getInstance();
    }
}


class ProductFactory{
    static getInstance (){
        if(process.env.DATACORE === 'MONGO_DB') return ProductsMongoRepository.getInstance();
        return ProductsFsRepository.getInstance('Products');
    }
}

class CartFactory{
    static getInstance(){
        if(process.env.DATACORE ==='MONGO_DB') return CartMongoRepository.getInstance();
        return CartFsRepository.getInstance('Cart');
    }
}


module.exports= {ProductFactory,UserFactory, CartFactory};