const CartModel = require('../../models/cart.model')
const MongooseConnect = require('../../../utils/mongo/connect');
const CartDto = require('../../dto/cart.dto');

const AppError = require('../../../middlewares/error.middleware');
const {logger}= require('../../../utils/logger/index.logger')

class CartMongoRepository{
    constructor(){
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if(!this.instance){
            this.instance =  new CartMongoRepository();
            logger.info('Carts Repository: Local Mongo instance created')
        }
        return this.instance
    }

    async getAll(){
        try {
            const query = await CartModel.find({});
           
            return query
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'getAll() error', 500);
        }
    }

    async append(data){
        try {
            const cart = new CartModel(data);
            return await cart.save();
                        
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'append() error', 500);
        }
    }

    async update (cartData){
        try {
            const filter = {_id: cartData._id};
            const updateCart = await CartModel.findOneAndUpdate(filter,cartData, {new:true})
            if(!updateCart){
                return false
            }
            return this.update   
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'update() error', 500);
        }
    }

    async updateProducts (cartId, productsToUpdate){
        try {
            const filter = {_id: cartId};
            

            const update = {
                $set: {products: productsToUpdate}
            }

            const existCart = await CartModel.findOne(filter);
            console.log(existCart)

            const updatedCart = await CartModel.findOneAndUpdate(filter,update, {new:true});
            
            
            if(!updatedCart){
                return false
            }
            return this.updateProducts
            
        } catch (err) {
            //throw new AppError(err.message, 'Mongo data process','Cart Repository', 'update() error', 500);
            console.error(err)
        }
    }

    async getLastCart (userId){
        try {
            const query = await CartModel.findOne({['userId']: userId, ['completed']:false});
            if(!query){
                return false
            }

            return query
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'getLastCart() error', 500);
        }
    }

    async getByCondition (fieldName = '_id' , fieldValue ){
        try {
            const query = await CartModel.findOne({[fieldName]: fieldValue});
            const cartDto = await new CartDto(query);
            return cartDto
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'getByCondition() error', 500);

        }
    }

    async deleteByCondition(fieldName = '_id' , fieldValue ){
        try {
            const filter = { [fieldName]: fieldValue};
            const deleteCart =  await CartModel.findOneAndDelete(filter);
            if(!deleteCart){
                return false
            }
            return deleteCart
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'deleteByCondition() error', 500);

        }
    }

    async deleteAll(){
        try {
            const deleteCart = await CartModel.deleteMany();
            if(!deleteCart.deletedCount ===0){
                return false
            }
            return deleteCart
            
        } catch (err) {
            throw new AppError(err.message, 'Mongo data process','Cart Repository', 'deleteAll() error', 500);

        }
    }

}

module.exports= CartMongoRepository