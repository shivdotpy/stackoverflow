const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    email : String,
    password: String,
    posts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

module.exports = mongoose.model('User', userModel);