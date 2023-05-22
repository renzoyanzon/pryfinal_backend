const ProductServices = require('../../services/product/product.services')
const httpStatus = require('http-status')

class ProductsGraphQlController{
    constructor(){
        this.productFactory = new ProductServices();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsGraphQlController()
        }
        return this.instance
    }

    getAll = async (_req, _res) =>{
        try{
            const query = await this.productFactory.getAll();
            return query
        } catch(err){
            return err
        }
    }

    getById = async(id) =>{
        try {
            const query = await this.productFactory.getById(id);
            return query
        } catch(err){
            return err
        }
    }

    save = async(req, res) =>{
        try {
            const mutation = await this.productFactory.save(req.body);
            return true
        } catch(err){
            return false
        }
    }

    deleteById = async(req, res) =>{
        try {
            const id = parseInt(req.params.id);
            const data = await this.productFactory.deleteById(id);
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} eliminated`
            });
        } catch(err){
            console.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async(_req, res) =>{
        try {
            const data = await this.productFactory.deleteAll();
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `All products eliminated`
            });
        } catch(err){
            console.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }
}

module.exports = ProductsGraphQlController;