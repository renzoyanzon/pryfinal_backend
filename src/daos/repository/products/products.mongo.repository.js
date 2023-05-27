const ProductModel = require('../../models/product.model');
const MongooseConnect = require('../../../utils/mongo/connect');
const ProductDto = require('../../dto/products.dto');

const AppError = require('../../../middlewares/error.middleware')

class ProductsMongoRepository {
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new ProductsMongoRepository();
            console.info('Local Mongo Repository for products created');
        }
        return this.instance
    }

    async getAllProducts(){
        try {
           
            const query = await ProductModel.find({});
            return query;
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Products Repository', 'getAllProducts() error', 500);
            
        }

    }

    async append(data){
        try {
            
            const product = new ProductModel(data);
            return await product.save();
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Products Repository', 'createProduct() error', 500);
        }
        
    }

    async getProductById (fieldName= '_id', fieldValue){
        try {
            const query= await ProductModel.findOne({[fieldName]:fieldValue});
            const productDto = await new ProductDto(query);
            return productDto;
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Products Repository', 'getProductById() error', 500);
        }
    }

}

module.exports = ProductsMongoRepository;