const express = require('express');
const router = express.Router();
const {getQuizzes, addQuiz, deleteQuiz, updateQuiz} = require('../../controllers/quizController');

router
  .route('/')
  .get(getQuizzes)

router
  .route('/edit')
  .post(addQuiz);

router
  .route('/edit/:id')
  .put(updateQuiz)
  .delete(deleteQuiz);


module.exports = router;