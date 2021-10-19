const express = require('express');
const router = express.Router();

// Quiz model
const Quiz = require('../../models/Quiz');

// TODO: modify this sample later 
// @route GET api/quizzes
// @desc  GET all quizzes
// @access Public
router.get('/', (req,res) => {
    Quiz.find()
        .sort({date:-1})
        .then(quizzes => res.json(quizzes));
});
// TODO: modify this sample later
// @route POST api/quizzes
// @desc  Create a POST
// @access Public
router.post('/', (req,res) => {
    const newQuiz = new Quiz({
        name: req.body.name
    });

    newQuiz.save().then(quiz => res.json(quiz));
});
// TODO: modify this sample later
// @route DELETE api/quizzes/:id
// @desc  DELETE a quiz
// @access Public
router.delete('/:id',(req,res) => {
    Quiz.findById(req.params.id)
        .then(quiz => quiz.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;