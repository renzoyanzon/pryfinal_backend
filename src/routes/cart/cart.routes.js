const router= require('express').Router();
const _ = require('lodash');
const {v4: uuidv4} = require('uuid');

const {getCartRepository} = require('../../daos/index');
const CartService = getCartRepository();
const cartService = new CartService();

router.post('/', async (req,res)=>{
    try {
        const {body} =req;
    
        if(_.isNil(body)) res.status(400).json({success:false, message: "ERROR (body missing)"});
    
        const data = await cartService.createCarts(body);
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch (error) {
        console.error(error)
    }

});

router.get('/', async(_req,res)=>{
    try {
        const data = await productService.getAllCarts();
        if(!data.success) res.status(500).json(data)
        res.render('pages/carts', data)
    } catch (error) {
        console.error(error)
    }
})



module.exports= router;