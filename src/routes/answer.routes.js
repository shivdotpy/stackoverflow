const express = require('express');
const router = express.Router();
const answer = require('../controllers/answer.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, answer.addAnswer);

module.exports = router;
