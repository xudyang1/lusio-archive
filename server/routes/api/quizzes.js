const express = require('express');
const router = express.Router();
const { getQuiz, getQuizzes, addQuiz, deleteQuiz, updateQuiz, updateQuizImage } = require('../../controllers/quizController');

const upload = require('../../middleware/upload');

router
  .route('/')
  .get(getQuizzes);

router
  .route('/edit')
  .post(addQuiz);

router
  .route('/edit/:id')
  .get(getQuiz)
  .put(updateQuiz)
  .delete(deleteQuiz);

/**
 * @desc  Update image
 * @route POST api/quizzes/quiz/upload/:quizId
 * @access  Private
 * @middlewares  {strictAuth}: only owner can edit the profile
 *              {upload}: image upload middleware
 */
router
  .route('/quiz/upload/:quizId')
  .post(upload, updateQuizImage);


module.exports = router;