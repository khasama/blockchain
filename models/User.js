const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    wallet: {
        type: String
    },
    avatar: {
        type: String,
        default: "unknow.jpg"
    }
});

module.exports = mongoose.model('user', userSchema);