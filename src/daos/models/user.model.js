const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('user',UserSchema);