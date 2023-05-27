const {UserFactory} = require('../../daos/factory');

const EncryptServices = require('../../utils/encrypt/encrypt.services');
const encryptServices = new EncryptServices();

class UserServices {
    constructor(){
        this.userFactory = UserFactory.getInstance();
    }

    getAll = async()=>{
        try {
            const data = await this.userFactory.getAll();

            return data

        } catch (err) {
            console.error(err.message)
        }
    }

    getById = async(_id)=>{
        try {
            const data = await this.userFactory.getByCondition('_id',_id);

            return data

        } catch (err) {
            console.error(err.message)
        }
    }

    getByUserName = async(username)=>{
        try {
            const data = await this.userFactory.getByCondition('username',username);

        return data
            
        } catch (err) {
            console.error(err.message)
        }
    }

    passwordCheck = async(username,password)=>{
        try {
            const data = await this.userFactory.getPassByUserName(username);
            if(!data) return false;
            const passwordChecked = await encryptServices.verifyPassword(password,data);
            if(!passwordChecked) return false;

            return true

        } catch (err) {
            console.error(err.message)
        }  
    }

    append = async(userData)=>{
        try {
            const hashPass = await encryptServices.hashPassword(userData.password);
            userData.password = hashPass;
            const newUser = {...userData};
            const data = await this.userFactory.append(newUser);

            return(data)
            
        } catch (err) {
            console.error(err.message)
        }  
    }

    deleteById = async(_id)=>{
        try {
            const data = await this.userFactory.deletebyCondition('_id',_id);

            return data
        } catch (err) {
            console.error(err.message)
        }
         
    }

}

module.exports = UserServices;