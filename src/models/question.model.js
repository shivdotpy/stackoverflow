const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    tags: [{name: String}],
    like: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        count: Number
    }],
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        like: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            count: Number
        }],
    }],
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

module.exports = mongoose.model('Question', questionModel);
