const fs = require('fs');
const {v4:uuidv4} =require ('uuid');

class UsersFsRepository{
    constructor(_nameFile){
        this.ruta = `./${_nameFile}.txt`;
        
        this.createFile();
    }

    async createFile (){
        try {
            await fs.promises.writeFile(this.ruta)  
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }

    static getInstance(_nameFile){
        if (!this.instance){
            this.instance = new UsersFsRepository(_nameFile);
            console.log('File Repository for users Created');
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
            console.log("Error al crear archivo", err.message);
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
            console.log("Error al crear el usuario", err.message);
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
            console.log("Error al obtener el ususario", err.message);
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
            console.log("Error al obtener el password del usuario", err.message);
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
            console.log("Error al borrar el usuario", err.message);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta,"");
            return true
            
        } catch (err) {
            console.log("Error al borrar todos los usuarios", err.message);
        }
    }
}

module.exports= UsersFsRepository