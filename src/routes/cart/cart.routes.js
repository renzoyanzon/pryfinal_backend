const router= require('express').Router();
const CartController = require('../../controllers/cart/cart.controller');

class CartRouter {
    constructor(){
        this.cartController = CartController.getInstance();
    }

    start(){
        //router.get('/', this.cartController.getAll);
        router.post('/:productId', this.cartController.addProduct);
        router.post('/buyCart/:cartId', this.cartController.buyCart);
        router.get('/:productId', this.cartController.deleteProductById);
        router.get('/delete/:cartId', this.cartController.deleteById)
        return router
    }
}

module.exports = CartRouter;