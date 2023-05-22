const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require:true
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
    }
})

const ProductModel= mongoose.model('products',ProductSchema);

module.exports= ProductModel