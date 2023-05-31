const {UserFactory} = require('../../daos/factory');

const EncryptServices = require('../../utils/encrypt/encrypt.services');
const encryptServices = new EncryptServices();

const AppError = require('../../middlewares/error.middleware');

class UserServices {
    constructor(){
        this.userFactory = UserFactory.getInstance();
    }

    getAll = async()=>{
        try {
            const data = await this.userFactory.getAll();

            return data

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Users Services','getAll error', 500 );
        }
    }

    getById = async(_id)=>{
        try {
            const data = await this.userFactory.getByCondition('_id',_id);

            return data

        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Users Services','getById error', 500 );
        }
    }

    getByUserName = async(username)=>{
        try {
            const data = await this.userFactory.getByCondition('username',username);

        return data
            
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Users Services','getByUserName error', 500 );
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
            throw new AppError(err.message, 'Data process', 'Users Services','passwordCheck error', 500 );
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
            throw new AppError(err.message, 'Data process', 'Users Services','append error', 500 );
        }  
    }

    deleteById = async(_id)=>{
        try {
            const data = await this.userFactory.deletebyCondition('_id',_id);

            return data
        } catch (err) {
            throw new AppError(err.message, 'Data process', 'Users Services','deleteById error', 500 );
        }
         
    }

}

module.exports = UserServices;