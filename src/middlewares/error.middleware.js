const httpStatus = require  ('http-status');
const {logger}= require('../utils/logger/index.logger')


class AppError extends Error{
    constructor(origin,type,context,message,statusCode){
        super(origin);
        this.errorList = [];
        this.errorList.push({
            name: this.contructor.name,
            origin: origin,
            message:message,
            type: type,
            context: context,
            statuCode : `${httpStatus[statusCode]}`,
            timestamp: new Date().toDateString()
        })
        logger.error(this.message)
    }
}

module.exports = AppError;