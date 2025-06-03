const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tạo collection
const Users = new Schema({
    username: {type: String, unique: true},
    password: {type: String}, 
    age: {type: Number},
    address: {type: String},
    image: {type: String}
}, {
    timestamps: true
})
module.exports = mongoose.model('user', Users)