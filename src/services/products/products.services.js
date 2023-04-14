const productModel= require('../../services/mongo/product.model');

class ProductServices {
    constructor(){}

    async createProducts (){
        const productMock = {
            name:"producto 1",
            description:"La descripcion del producto 1",
            price:10,
            code:31223,
            thumbnail:"https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_stand_men-512.png",
            stock:100,
            uuid:"514a733d-c962-4e52-821e-767ff404ba69",
            timestamp: Date.now()
        }
        
        try {
            
            const newProduct = new productModel(productMock);
            const product = await newProduct.save();
            return({
                success: true,
                data: `Product ${product.name} created successfully`
            })

        } catch (error) {
            console.error(error)
        }
    }

    async getAllProducts (){
       
        const data = await productModel.find();
        const dataParse = JSON.parse(JSON.stringify(data));

        try {
            return({
                success: true,
                data: dataParse
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    async getProduct (id){
        const data = await productModel.findOne({uuid: id});
        const dataParse = JSON.parse(JSON.stringify(data) );

        try {
            return({
                success: true,
                data: dataParse
            })
            
        } catch (error) {
            console.error(error)
        }
    }
}



module.exports = ProductServices