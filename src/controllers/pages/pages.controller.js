const UserServices = require('../../services/user/user.services');
const userServices= new UserServices();

const ProductServices= require('../../services/product/product.services');
const productServices= new ProductServices();

const CartServices = require('../../services/cart/cart.services');
const cartSertices = new CartServices();

const createMessage = require('../../utils/pages/pages.utils');
const AppError = require('../../middlewares/error.middleware');


class PagesController {
    constructor(){}

    signIn = async (req,res)=>{
        const authenticated = req.isAuthenticated();
        if(authenticated){
           return res.redirect('/')
        }
        const message = createMessage('signIn', req)
        res.render('signin', {message: message});
    };

    signUp = async(req, res) => {
        const authenticated = req.isAuthenticated();
        if (authenticated){
            return res.redirect('/')
        }
        const message = createMessage('signUp', req)
        res.render('signup',{message:message});
    }

    home = async(req, res) => {
        
        const userId = req.session.passport.user;
        const user = await userServices.getById(userId);
        const message= createMessage('home', req, {user})
        res.render('home',{message:message});
    }

    products = async(req,res)=>{
        let products = await productServices.getAll();
        const message = createMessage('home',req, {products})
        res.render('products',{message:message});
    }

    error = async(_req, res) => {
        res.render('error');
    }

    signOut = async(req, res) => {
        
        req.logout(()=>{
            res.redirect('/signin')
        })
    }

    cart = async(req,res)=>{
        try {
            const userId = req.session.passport.user;
            const cart= await cartSertices.getLastCart(userId);
            const user = await userServices.getById(userId);
            const message = createMessage('cart',req, {user,cart})
            res.render('cart',{message:message})
        } catch (err) {
            console.error(err)
        }
    }



} 


module.exports = PagesController;
