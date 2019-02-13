const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    reputation: {type: Number, default: 0},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', userModel);
