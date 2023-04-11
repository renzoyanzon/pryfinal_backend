const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        
    },

    price: {
        type: Number,
        require:true
    },

    code: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
        max: 100
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    uuid: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
})

const productModel= mongoose.model('products',productSchema);

module.exports= productModel