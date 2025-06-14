const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    }

});

const User = mongoose.model('Users', Userschema);

module.exports = User;