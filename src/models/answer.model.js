const mongoose = require('mongoose');

const answerModel = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answer: String,
    comments: [{
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answer: String,
        like: [{
            author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            count: Number
        }],
    }]
});

module.exports = mongoose.model('Answer', answerModel);
