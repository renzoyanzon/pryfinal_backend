const argon2= require('argon2');

class EncryptServices{
    constructor(){}

    async hashPassword (password){
        try {
            const hash= await argon2.hash(password);
            return hash
            
        } catch (err) {
            console.error('Error al generar el hash', err)
        }
    }

    async verifyPassword (password,hash){
        try {
            const match = await argon2.verify(hash,password);
            return match
        } catch (err) {
            console.error('Error al verificar la contraseña', err)
        }

    }
}

module.exports = EncryptServices;