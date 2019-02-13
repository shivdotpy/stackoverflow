const express = require('express');
const router = express.Router();
const question = require('../controllers/question.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, question.addQuestion);

module.exports = router;
