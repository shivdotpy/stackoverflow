const express = require('express');
const router = express.Router();
const question = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:page', question.getQuestions);
router.get('/get-question-by-id/:id', authMiddleware, question.getQuestionById);

router.post('/', authMiddleware, question.addQuestion);
router.get('/my-questions', authMiddleware, question.getUserQuestions);
router.get('/my-questions/:page', authMiddleware, question.getUserQuestions);
router.get('/search-my-questions/:search/:page', authMiddleware, question.searchUserQuestions);
router.get('/my-questions-by-tag/:tag/:page', authMiddleware, question.getUserQuestionByTags);

router.post('/vote', authMiddleware, question.voteQuestion);

module.exports = router;
