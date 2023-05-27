const { ProductFactory } = require('../../daos/factory');

const AppError = require('../../middlewares/error.middleware');

class ProductServices{
    constructor(){
        this.productFactory = ProductFactory.getInstance();
       
    }

    getAll = async()=>{
        try {
            
            const data = await this.productFactory.getAllProducts();
            
            return data;

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Products Services','getAll() error', 500 );
          
        }
    }

    getById = async(_id)=>{
        try {
            const data = await this.productFactory.getProductById('_id',_id);
            return data;
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Products Services','getById(_id) error', 500 );
           
        }
    }

    append = async(productData)=>{
        try {
            
            const data = await this.productFactory.append(productData);
            return data 

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Products Services','create(productData) error', 500 );
           
        }
    }

    //TODO
    //FALTA CREAR EL DELETEBY ID Y EL DELETEALL

}

module.exports = ProductServices;

