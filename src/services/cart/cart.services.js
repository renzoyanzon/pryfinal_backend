const {CartFactory} = require('../../daos/factory');

const sendEmail= require('../../services/nodeMailer/nodeMailer.services')

const AppError = require('../../middlewares/error.middleware');

class CartServices {
    constructor(){
        this.cartFactory = CartFactory.getInstance();
    }

    getAll= async ()=>{
        try {
            const data = await this.cartFactory.getAll();
            return data
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','getAll error', 500 );

        }
    }

    createCart = async (userId) =>{
        try {
            const newCart = {
                userId: userId,
                products: [],
                completed: false
            }
            const data = await this.cartFactory.append(newCart);
            return data
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','createCart error', 500 );
        }
    }

    append = async(userId, productToappend)=>{
        try {
            let cartToUpdate = await this.cartFactory.getLastCart(userId);
            if(!cartToUpdate || cartToUpdate.completed){
                await this.createCart(userId);
                cartToUpdate = await this.cartFactory.getLastCart(userId);
            }

            cartToUpdate.products.push(productToappend);
            const data = await this.cartFactory.update(cartToUpdate);
            return data

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','append error', 500 );
        }
    }

    getById = async (cartId)=>{
        try {
            const data = await this.cartFactory.getByCondition('_id',cartId);
         
            
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','getById error', 500 );
        }
    }

    getLastCart = async (userId)=>{
        try {
            const data = await this.cartFactory.getLastCart(userId);
            return data
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','getLastCart error', 500 );
        }
    }

    buyCart = async (cartId)=>{
        try {
            let cartSelected = await this.cartFactory.getByCondition('_id',cartId);
            cartSelected.completed = true;
            const data = await this.cartFactory.update(cartSelected);
            if(data){
                await sendEmail(`Cart ${cartId} booked successfully`)
            }

            return data

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','buyCart error', 500 );
        }
    }

    deleteById = async (cartId)=>{
        try {
            const data = await this.cartFactory.deleteByCondition('_id',cartId);
            return data
            
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','deleteById error', 500 );
        }
    }

    deleteProductById = async (cartId, userId,productId)=>{
        try {
            let cartToUpdate = await this.cartFactory.getLastCart(userId);
            const query = cartToUpdate.products.filter(el=> el._id.valueOf() !== productId);
        
            const data = await this.cartFactory.updateProducts(cartId, query);
            return data

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Carts Services','deleteProductById', 500 );
        }
        
    }
        
}

module.exports= CartServices;