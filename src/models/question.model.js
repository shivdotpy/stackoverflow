const mongoose = require('mongoose');

const questionModel = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    tags: [{name: String}],
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String
    }],
    answers: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        comments: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            answer: String
        }]
    }]
});

module.exports = mongoose.model('Question', questionModel);
