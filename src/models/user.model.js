const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', userModel);
