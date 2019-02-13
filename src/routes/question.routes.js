const express = require('express');
const router = express.Router();
const question = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, question.addQuestion);

router.get('/all', question.getQuestions);
router.get('/all/:tag', question.getQuestionByTags);

router.get('/my-questions', authMiddleware, question.getUserQuestions);
router.get('/my-questions/:page', authMiddleware, question.getUserQuestions);

module.exports = router;
