const fs = require('fs');
const {v4:uuidv4} =require ('uuid');

const AppError= require('../../../middlewares/error.middleware');
const {logger}= require('../../../utils/logger/index.logger')

class UsersFsRepository{
    constructor(_nameFile){
        this.ruta = `./${_nameFile}.txt`;
        
        this.createFile();
    }

    async createFile (){
        try {
            await fs.promises.writeFile(this.ruta)  
        } catch (err) {
            logger.error("Error al crear archivo", err.message);
        }
    }

    static getInstance(_nameFile){
        if (!this.instance){
            this.instance = new UsersFsRepository(_nameFile);
            logger.info('File Repository for users Created');
        }
        
        return this.instance
    }

    async getAll (){
        try {
            const users = await fs.promises.readFile(this.ruta, 'utf-8');
            if(!users){
                let data = []
                return data
            }
        const data = JSON.parse(users);
        return data
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getAll() error', 500 );
        }
    }

    async append (userData){
        try {
            const users = await this.getAll();
            const _id = uuidv4();

            const newUser = {...userData, _id:_id};
            users.push(newUser);
            const data = JSON.stringify(users);
            await fs.promises.writeFile(this.ruta,data);

            return newUser
            
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','append(userData) error', 500 );
        }
    }

    async getByCondition(fieldName = "_id", fieldValue){
        try {
            const users = await this.getAll();
            const [ query ] = users.filter(el=> el[fieldName] === fieldValue)
            if(query == null){
                return false
            }

            return query

        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async getPassByUserName (username) {
        try {
            const users = await this.getAll();
            const [query]= users.filter(el=> el.username == username);
            if(query == null){
                return false
            }

            return query.password

        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','getPasswordByUserName(username) error', 500 );
        }
    }

    async deletebyCondition (fieldName = "_id", fieldValue){
        try {
            const users = await this.getAll();
            const newUsers = users.filter(el=> el[fieldName] != fieldValue);

            if(users == newUsers){
                return false
            }
            const data = JSON.stringify(newUsers);
            await fs.promises.writeFile(this.ruta,data)
            return data;
            
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteByCondition(fieldName, fieldValue) error', 500 );
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta,"");
            return true
            
        } catch (err) {
            throw new AppError(err.message, 'File data process', 'Users Repository','deleteAll error', 500 );
        }
    }
}

module.exports= UsersFsRepository