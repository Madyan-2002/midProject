const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['clothing', 'books', 'electronics', ' toys', 'home', 'beauty', 'other'],
        default: 'other'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);