const CartServices = require('../../services/cart/cart.services');

const UserServices = require('../../services/user/user.services');
const userServices = new UserServices();

const ProductServices = require('../../services/product/product.services');
const productServices = new ProductServices();

const httpStatus = require('http-status');

const {logger} = require('../../utils/logger/index.logger')

class CartController{
    constructor(){
        this.cartServices = new CartServices();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new CartController();
        }
        return this.instance
    }

    getAll = async (_req,res)=>{
        try {
            const data = await this.cartServices.getAll();
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }

            return res.status(200).json({
                success: true,
                message: data
            });
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    createCart = async(req,res)=>{
        try {
            const userId = req.session.passport.user;
            const newCart = {
                userId: userId,
                products: [],
                completed: false
            }

            const cartId = await this.cartServices.append(newCart);
            if(!cartId){
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return cartId
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    addProduct = async(req,res)=>{
        try {
            const {productId}= req.params;
            const userId = req.session.passport.user;
            const productToappend = await productServices.getById(productId);
            const data = await this.cartServices.append(userId, productToappend);
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }

            this.cart(req,res)
            
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    buyCart = async(req,res)=>{
        try {
            const {cartId} = req.params;
            const data = await this.cartServices.buyCart(cartId);
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }

            this.cart(req,res);
            
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    getById = async (req,res)=>{
        try {
            const id = req.params.id;
            const data = await this.cartServices.getById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            return res.status(200).json({
                success: true,
                message: data
            });
            
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    append = async(req,res)=>{
        try {
            const {_id}= req.params;
            const productSelected = await productServices.getById(_id);
            const data = await this.cartServices.append(productSelected)
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            this.cart(req, res);
        } catch (err) {
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById = async(req, res) =>{
        try {
            const id = req.params.id;
            const data = await this.cartServices.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} deleted from cart`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req, res) =>{
        try {
            const data = await this.cartServices.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `All products deleted from Cart`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }







    cart = async (req,res)=>{
        const userData = await userServices.getById(req.session.passport.user);

        const navBar = [
            {title: "Home", link: "/"},
            {title: "Cart", link: "/cart"},
            {title: "Logout", link:"/api/auth/signout"}
        ];

        const main = {
            user: userData.username,
            isAuthenticated: req.isAuthenticated(),
            cart: await this.cartServices.getLastCart(req.session.passport.user)
        }

        const message= {
            navBar: navBar,
            main: main
        }

        res.render('cart', {message: message})


    }
}

module.exports= CartController;
