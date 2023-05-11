const router= require('express').Router();
const ProductsRestController = require('../../controllers/products/products.rest.controller');

class ProductsRouter {

    constructor(){
        this.productsRestController = ProductsRestController.getInstance();
    }

    start (){
        router.get('/',this.productsRestController.getAll);
        router.get('/:id',this.productsRestController.getById);
        router.post('/',this.productsRestController.create);
        router.delete('/',this.productsRestController.deleteAll);
        router.delete('/:id',this.productsRestController.deleteById);

        

        return router
    }

}

module.exports = ProductsRouter