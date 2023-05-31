const fs = require('fs');
const {v4:uuidv4} =require ('uuid');
const {logger} = require('../../../utils/logger/index.logger')

const CartDto = require('../../dto/cart.dto');

class CartFsRepository {
    constructor(_fileName){
        this.ruta= `./${_fileName}.txt`;
        this.createFile();
    }

    static getInstance (_fileName){
        if(!this.instance){
            this.instance = new CartFsRepository(_fileName);
            logger.info(`Cart Repository: File ${this.instance.ruta} used`)
        }
        return this.instance
    }

    async createFile(){
        try{
            await fs.promises.writeFile(this.ruta, "");
        } catch (err) {
            logger.info ("Cart Repository: Error creating file", err.message);
        }
    }

    async getAll (){
        try {
            const cart = await fs.promises.readFile(this.ruta, 'utf-8');
            if(cart = ""){
                let data = []
                return data
            }
            const data = JSON.parse(cart);
            return data
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    async append (cartData){
        try {
            const cart= await this.getAll();
            _id = uuidv4();
            const cartDto = new CartDto(cartData)
            const newCart = {...cartDto, _id:_id};
            cart.push(newCart);

            const data = await fs.promises.writeFile(this.ruta, JSON.stringify(newCart));
            return data
            
        } catch (err) {
            console.error(err.message)
        }
    }

    async update(cartData){
        try {
            const cart = await this.getAll();
            const updateCart = cart.map(el=>{
                if(el._id== cartData._id){
                    el= cartData;
                }
                return el
            })

            const data = JSON.stringify(updateCart);
            await fs.promises.writeFile(this.ruta,data);

            return true
        }  catch (err) {
            console.error(err.message)
        }
    }

    async getLastCart (userId){
        try {
            const cart = await this.getAll();
            const query = cart.filter(el=> (el.userId === userId && el.completed == false));
            if(!query?.length){
                return false
            }
            return query[ query.length - 1];

        } catch (err) {
            console.error(err.message)
        }
    }

    async getByCondition (fieldName = "_id", fieldValue){
        try {
            const cart = await this.getAll();
            const [query] = cart.filter(el=> el[fieldName]= fieldValue);
            if(query == null){
                return false
            }
            const cartDto = new CartDto(query);
            return cartDto
        } catch (err) {
            console.error(err.message)
        }
    }

    async deleteByCondition (fieldName = "_id", fieldValue){
        try {
            const cart = await this.getAll();
            const [query]= cart.filter(el=> el[fieldName] != fieldValue);
            if(cart == query){
                return false
            }
    
            const data = JSON.stringify(query);
            await fs.promises.writeFile(this.ruta, data);
            return true
            
        } catch (err) {
            console.error(err.message)
        }
       
    }

    async deleteAll (){
        try {
            await fs.promises.writeFile(this.ruta,"");
            return true
            
        } catch (err) {
            console.error(err.message)
        }
    }


}

module.exports= CartFsRepository;