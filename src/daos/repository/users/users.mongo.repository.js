const UserModel = require('../../models/user.model');
const MongooseConnect = require('../../../utils/mongo/connect');


class UsersMongoRepository{
    constructor() {
        MongooseConnect.getInstance();
    }

    static getInstance(){
        if (!this.instance){
            this.instance = new UsersMongoRepository();
            console.info('Users Repository: Local Mongo instance created');
        }
        return this.instance
    }

    async getAll (){
        try {
            const query = await UserModel.find({});
            return query
            
        } catch (err) {
            console.error(err.message)
        }
    }

    async append(data){

        try {
            const userStage = new UserModel(data);
            return await userStage.save();
        } catch (err) {
            console.error(err.message)
        }
        
    }

    async getByCondition( fieldName = '_id' , fieldValue ){
        try {
            const query = await UserModel.findOne({ [fieldName]: fieldValue});
            return query
            
        } catch (err) {
            console.error(err.message)
        }
    }

    async getPassByUserName(username){
        try {
            const query = await UserModel.findOne({username});
            return query.password
        } catch (err) {
            console.error(err.message)
        }
    }
}

module.exports = UsersMongoRepository;