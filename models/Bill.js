const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    detail: [{
        type: Object
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    wallet: {
        type: String,
        required: true
    }
    
}, { timestamps: true });

module.exports = mongoose.model('bill', billSchema);