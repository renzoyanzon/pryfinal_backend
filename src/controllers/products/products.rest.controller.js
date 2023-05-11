const {ProductsFactory} = require('../../daos/factory');
const httpStatus = require('http-status')

class ProductsRestController {
    constructor(){
        this.productFactory = ProductsFactory.getInstance();
    }

    static getInstance (){
        if(!this.instance){
            this.instance = new ProductsRestController
        }
        return this.instance
    }

    getAll = async(_req, res) =>{
        try {
            const data = await this.productFactory.getAllProducts();
            
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
            console.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    getById = async (req,res)=>{
        try {
            const id = req.params.id;
            const data = await this.productFactory.getProductById(id);
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
            console.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

    create = async(req, res) =>{
        try {
            const data = await this.productFactory.createProduct(req.body);
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
            console.error(err);
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
            console.error(err);
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
            console.error(err);
            res.send({
                success: false,
                message: err
            });
        }
    }

}

module.exports = ProductsRestController;