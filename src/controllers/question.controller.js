const Question = require('../models/question.model');
const validations = require('../validations/validations');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const addQuestion = (req, res) => {
    // Title Validation
    const titleValidResult = validations.titleValidation(req.body.title);
    if (titleValidResult.required) {
        return res.status(400).send({
            message: 'Title required'
        })
    }

    // Description Validation
    const descriptionValidResult = validations.descriptionValidation(req.body.description);
    if (descriptionValidResult.required) {
        return res.status(400).send({
            message: 'Description required'
        })
    }

    // Get USER ID
    jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function (err, decoded) {
        const userId = decoded.id;


        const question = new Question({
            author: userId,
            title: req.body.title,
            description: req.body.description
        });

        question.save()
            .then(() => {
                return res.status(201).send({
                    error: false,
                    message: 'Question saved successfully'
                })
            })
            .catch((err) => {
                return res.status(500).send({
                    error: err,
                    message: 'Something went wrong, please try again later'
                })
            });
    });
};

const getLatestQuestions = (req, res) => {

};

const getUserQuestions = (req, res) => {

};

module.exports.addQuestion = addQuestion;
module.exports.getLatestQuestions = getLatestQuestions;
module.exports.getUserQuestions = getUserQuestions;
