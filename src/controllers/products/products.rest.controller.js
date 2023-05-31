const ProductServices = require('../../services/product/product.services');

const httpStatus = require('http-status');
const {logger} = require('../../utils/logger/index.logger');

class ProductsRestController {
    constructor(){
        this.productServices = new ProductServices();
    }

    static getInstance (){
        if(!this.instance){
            this.instance = new ProductsRestController
        }
        return this.instance
    }

    getAll = async(_req, res) =>{
        try {
            const data = await this.productServices.getAll();
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            
            return res.status(200).json({
                success: true,
                message:data
            });

        } catch(err){
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
            const data = await this.productServices.getById(id);
            if(!data){
                return res.status(500).json({
                    success:false,
                    message: `${httpStatus[500]}`
                })
            }

            return res.status(200).json({
                success:true,
                message: data
            })

            
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    append = async(req, res) =>{
        try {
            const data = await this.productServices.append(req.body);
            
            if (!data) {
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${data} created`
            });
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteAll = async (_req,res)=>{
        try {
            const data = await this.productFactory.deleteProducts();
        
            res.status(200).json({
                success:true,
                message: 'All products eliminated'
            })
            
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    deleteById= async (req,res)=>{
        try {
            const id = parseInt(req.params.id) ;
            const data = await this.productFactory.deleteProductById(id);
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: `${httpStatus[500]}`
                })
            }
            res.status(200).json({
                success: true,
                message: `Product ${id} eliminated`
            })
        } catch(err){
            logger.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

}

module.exports = ProductsRestController;