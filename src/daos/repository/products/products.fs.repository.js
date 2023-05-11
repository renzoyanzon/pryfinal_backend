
const fs = require('fs');

class ProductsFsRepository{
    constructor(_nameFile){
        this.ruta = `./${_nameFile}.txt`;
        this.createFile();
    }

    async createFile (){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new ProductsFsRepository();
            console.log('File Repository for products Created');
        }
        
        return this.instance
    }



    async getAllProducts (){
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
            
            
        } catch (error) {
            console.error(error)
            
        }
    }

    async getProductById (id){

        try {
            const products= await this.getAllProducts();
            const product = products.filter(el=>el.id == id); 
            return product
        } catch (error) {
            console.log(error)     
        }
    }

    async createProduct(data){
        try {
            const products = await this.getAllProducts();
            const id = products.length >=1 ? products[products.length -1].id +1 : 1;
            products.push({...data, id:id});
            await fs.promises.writeFile(this.ruta, JSON.stringify(products))

            return id
            
        } catch (error) {
            console.log(error) 
        }
    }

    async deleteProductById (id){
        try {
            const products = await this.getAllProducts();
            const newProducts = products.filter(el=> el.id !== id);
            console.log(newProducts)
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts) );
            return({
                success:true,
                data: newProducts
            })

        } catch (error) {
            console.log(error) 
        }
    }

    async deleteProducts (){

        try {
            await fs.promises.writeFile(this.ruta, "");
        } catch (error) {
            console.log("Error en la eliminacion",error.message) 
        }
     
    }

    async updateProduct (uuid,data){
        try {
            console.log(data)
            const products = await fs.promises.readFile(this.ruta);
            const productsObject= JSON.parse(products);
            const newProducts = productsObject.map(el=>(el.uuid == uuid) ? data : el);
    
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts)) ;
            return({
                success:true,
                data: `Product ${uuid} updated successfully`
            })

        } catch (error) {
            console.log(error) 
        }
    }


}

module.exports= ProductsFsRepository;