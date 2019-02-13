const Question = require('../models/question.model');
const validations = require('../validations/validations');
const jwt = require('jsonwebtoken');

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
        let tags = [];
        if (req.body.tags) {
            for (let i = 0; i < req.body.tags.length; i++) {
                let temp = {
                    name: req.body.tags[i].toLowerCase()
                };
                tags.push(temp)
            }
        }
        const question = new Question({
            author: userId,
            title: req.body.title,
            description: req.body.description,
            tags: tags
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

const getQuestions = (req, res) => {
    // Question.find()
};

const getUserQuestions = (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function (err, decoded) {
        const userId = decoded.id;

        // PAGINATION STARTS
        const page = req.params.page;
        let skip = 0;
        if (page) {
            skip = (page - 1) * 10
        }
        // PAGINATION ENDS

        Question.find({author: userId})
            .populate({path: 'author', select: 'name email -_id'})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(10)
            .exec()
            .then((data) => {
                return res.status(200).send({
                    error: false,
                    data: data
                })
            })
            .catch((error) => {
                return res.status(500).send({
                    error: error,
                    message: 'Something went wrong, please try again later'
                })
            })
    });
};

const getQuestionByTags = (req, res) => {
    const tag = req.params.tag.toLowerCase();
    Question.find({"tags.name": tag})
        .sort({createdAt: -1})
        .limit(10)
        .exec()
        .then((data) => {
            res.status(200).send({
                error: false,
                data: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                message: 'Something went wrong, please try again later'
            })
        })
};

module.exports.addQuestion = addQuestion;
module.exports.getUserQuestions = getUserQuestions;
module.exports.getQuestionByTags = getQuestionByTags;
module.exports.getQuestions = getQuestions;
