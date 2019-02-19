const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    tags: [{name: String}],
    like: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
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
    answers: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        comments: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            answer: String,
            like: [{
                author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                type: Number,
                default: 0
            }],
        }]
    }]
}, {timestamps: true});

module.exports = mongoose.model('Question', questionModel);
