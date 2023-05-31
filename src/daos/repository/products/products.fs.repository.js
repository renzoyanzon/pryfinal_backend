const fs = require('fs');
const ProductDto = require('../../dto/products.dto');
const {v4: uuid}= require('uuid')

const {logger} = require('../../../utils/logger/index.logger');
const AppError = require('../../../middlewares/error.middleware')

class ProductsFsRepository{
    constructor(_nameFile){
        this.ruta = `./${_nameFile}.txt`;
        this.createFile();
    }

    async createFile (){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch (err) {
            logger.error("Products Repository: Error creating gile:", err.message);
        }
    }

    static getInstance(_nameFile){
        if (!this.instance){
            this.instance = new ProductsFsRepository(_nameFile);
            logger.info('File Repository for products Created');
        }
        
        return this.instance
    }



    async getAll (){
        try {
            const products = await fs.promises.readFile(this.ruta,'utf-8');
            if(products == ""){
                let data= [];
                return data;
            }
            else{
                let data = JSON.parse(products);
                return data
            }
            
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','getAll() error', 500 );
            
        }
    }

    async getByCondition (fieldName = "_id", fieldValue ){
        try {
            const products= await this.getAll();
            const [query] = products.filter(el=> el[fieldName] === fieldValue)
            if ( query == null ) {
                return false
            }
            const productDto= new ProductDto(query);
            return productDto
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','getByCondition(fieldName, fieldValue) error', 500 );  
        }
    }

    async append(productData){
        try {
            const products = await this.getAll();
            const _id = uuid()
            const productDto= new ProductDto(productData);
            const newProduct = {...productDto, _id:_id};
            products.push(newProduct);
            const data = JSON.stringify(products)
            await fs.promises.writeFile(this.ruta, data)

            return newProduct
            
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','append() error', 500 );
        }
    }

    async deleteByCondition ( fieldName = "_id", fieldValue){
        try {
            const products = await this.getAll();
            const newProducts = products.filter(el=> el[fieldName] !== fieldValue);

            if(products === newProducts){
                return false
            }
            const data = JSON.stringify(newProducts)
            await fs.promises.writeFile(this.ruta,data );

            return true

        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteAll (){

        try {
            await fs.promises.writeFile(this.ruta, "");
            return true
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','deleteAll error', 500 );
        }
     
    }

    async updateProduct (_id,data){
        try {
           
            const products = await fs.promises.readFile(this.ruta);
            const productsObject= JSON.parse(products);
            const newProducts = productsObject.map(el=>(el._id == _id) ? data : el);
    
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts)) ;
            return({
                success:true,
                data: `Product ${_id} updated successfully`
            })

        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Products Repository','updateProduct error', 500 );
        }
    }


}

module.exports= ProductsFsRepository;