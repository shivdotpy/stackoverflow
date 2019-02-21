const Question = require('../models/question.model');
const validations = require('../validations/validations');
const jwt = require('jsonwebtoken');

// USER
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

// USER
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

// USER
const searchUserQuestions = (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function (err, decoded) {
        const userId = decoded.id;

        // PAGINATION STARTS
        const page = req.params.page;
        if (!page) {
            return res.status(400).send({
                error: true,
                message: 'No page number sent'
            });
        }

        let skip = 0;
        if (page) {
            skip = (page - 1) * 10
        }
        // PAGINATION ENDS

        // SEARCH QUERY
        const search = req.params.search;
        if (!search) {
            return res.status(400).send({
                error: true,
                message: 'No search query sent'
            })
        }

        Question.find({author: userId, title: {"$regex": search.trim(), "$options": "i"}})
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

// USER
const getUserQuestionByTags = (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function (err, decoded) {
        const userId = decoded.id;

        // PAGINATION STARTS
        const page = req.params.page;
        if (!page) {
            return res.status(400).send({
                error: true,
                message: 'No page number sent'
            });
        }

        let skip = 0;
        if (page) {
            skip = (page - 1) * 10
        }
        // PAGINATION ENDS

        // Tag
        const tag = req.params.tag.toLowerCase();

        Question.find({author: userId, "tags.name": tag})
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

// BOTH
const getQuestionById = (req, res) => {

    const id = req.params.id;

    Question.findOne({_id: id})
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    error: true,
                    message: 'Question not found'
                })
            }
            return res.status(200).send({
                error: false,
                data: data
            })
        })
        .catch((error) => {
            return res.status(500).send({
                error: error,
                message: 'Something went wrong, please try again later',
            })
        });
};

// BOTH
const voteQuestion = (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function (err, decoded) {
        const userId = decoded.id;
        console.log('userid', userId);
        const vote = req.body.vote;
        console.log('vote', vote);
        const questionId = req.body.questionId;
        console.log('question id', questionId);

        if (!vote) {
            return res.status(400).send({
                message: 'Vote required'
            })
        } else if (!questionId) {
            return res.status(400).send({
                message: 'Question id required'
            })
        } else {

            let count = ['1', '0', '-1'];
            if (count.indexOf(vote) < 0) {
                return res.status(400).send({
                    message: 'Invalid count'
                })
            }

            Question.findOne({_id: questionId}, {like: 1})
                .then((data) => {

                    if (!data) {
                        return res.status(404).send({
                            error: true,
                            message: 'Question not found with this ID'
                        })
                    }

                    // GET question id
                    let idFound = false;
                    let likeId = '';
                    for (let i = 0; i < data.like.length; i++) {
                        if (data.like[i].author == userId) {
                            idFound = true;
                            likeId = data.like[i]._id
                        }
                    }

                    if (idFound) {
                        // UPDATE
                        let likeArray = [...data.like];
                        for (let i = 0; i < likeArray.length; i++) {
                            if (likeArray[i].author == userId) {
                                likeArray[i].count = vote
                            }
                        }

                        Question.findOneAndUpdate({_id: questionId}, {'$set': {like: likeArray}})
                            .then((data) => {
                                return res.status(200).send({
                                    message: 'Like updated successfully'
                                })
                            })
                            .catch((error) => {
                                return res.status(500).send({
                                    error: error,
                                    message: 'Something went wrong, please try again later'
                                })
                            })

                    } else {
                        // CREATE (working)
                        Question.findOneAndUpdate({_id: questionId}, {'$push': {like: {author: userId, count: vote}}})
                            .then(() => {
                                return res.status(200).send({
                                    message: 'Like created successfully'
                                })
                            })
                            .catch((error) => {
                                return res.status(500).send({
                                    error: error,
                                    message: 'Something went wrong, please try again later'
                                })
                            })
                    }
                })
        }
    });
};

const getQuestions = (req, res) => {
    // Question.find()
};

module.exports.addQuestion = addQuestion;
module.exports.getUserQuestions = getUserQuestions;
module.exports.getUserQuestionByTags = getUserQuestionByTags;
module.exports.getQuestions = getQuestions;
module.exports.voteQuestion = voteQuestion;
module.exports.searchUserQuestions = searchUserQuestions;
module.exports.getQuestionById = getQuestionById;
