const ProductModel = require('../../../services/mongo/product.model');
const MongooseConnect = require('../../../services/mongo/connect');

class ProductsMongoRepository {
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new ProductsMongoRepository();
            console.info('Local Mongo Repository for products created')
        }
    }

    async getAllProducts(){
        return await ProductModel.find({})
    }

    async createProduct(data){
        const product = new ProductModel(data);
        return await product.save();
    }

    async getProductById (id){
        return await ProductModel.find({uuid:id})
    }

}

module.exports = ProductsMongoRepository;