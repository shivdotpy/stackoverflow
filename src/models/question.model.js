const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    tags: [{name: String}],
    like: {type: Number, default: 0},
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        like: {type: Number, default: 0},
    }],
    answers: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        comments: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            answer: String,
            like: {type: Number, default: 0},
        }]
    }]
}, {timestamps: true});

module.exports = mongoose.model('Question', questionModel);
