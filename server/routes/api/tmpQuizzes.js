const express = require('express');
const router = express.Router();
const { getQuizWithoutQuestion } = require('../../controllers/tmpQuizController');
const { strictAuth, softAuth } = require('../../middleware/auth');

router
    .route('/quiz/:quizId')
    .get(softAuth, getQuizWithoutQuestion);

module.exports = router;