const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    price: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('cart', cartSchema);