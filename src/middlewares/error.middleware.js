const httpStatus = require  ('http-status');


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
        console.error(this.message)
    }
}

module.exports = AppError;