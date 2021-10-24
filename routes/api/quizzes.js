const express = require('express');
const router = express.Router();
const {getQuizzes, addQuiz, deleteQuiz} = require('../../controllers/quizController');

router
  .route('/')
  .get(getQuizzes)
  .post(addQuiz);

router
  .route('/:id')
  .delete(deleteQuiz);

module.exports = router;