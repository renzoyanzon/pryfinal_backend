const argon2= require('argon2');

const {logger}= require('../logger/index.logger')

class EncryptServices{
    constructor(){}

    async hashPassword (password){
        try {
            const hash= await argon2.hash(password);
            return hash
            
        } catch (err) {
            logger.error('Error al generar el hash', err)
        }
    }

    async verifyPassword (password,hash){
        try {
            const match = await argon2.verify(hash,password);
            return match
        } catch (err) {
            logger.error('Error al verificar la contraseña', err)
        }

    }
}

module.exports = EncryptServices;