const UserDTO = require ('../../../dto/user.dto');
const fs = require('fs');
const {v4:uuidv4} =require ('uuid')

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
            console.log('File Repository for products Created');
        }
        
        return this.instance
    }

    async getAllUsers (){
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

    async createUser (data){
        try {
            const users = await this.getAllUsers();
            const _id = uuidv4();
            const newUser = {...data, id:_id};
            users.push(newUser);
            const data = JSON.stringify(users);
            await fs.promises.writeFile(this.ruta,data);
            return newUser
            
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }

    async getUserById(id){
        try {
            const users = await this.getAllUsers();
            const _id = uuidv4();
            con
            
        } catch (err) {
            console.log("Error al crear archivo", err.message);
        }
    }
}