const express = require('express');
const router = express.Router();
const {getQuiz, getQuizzes, addQuiz, deleteQuiz, updateQuiz} = require('../../controllers/quizController');

router
  .route('/')
  .get(getQuizzes)

router
  .route('/edit')
  .post(addQuiz);

router
  .route('/edit/:id')
  .get(getQuiz)
  .put(updateQuiz)
  .delete(deleteQuiz);


module.exports = router;