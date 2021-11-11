const Quiz = require('../models/Quiz');

// TODO: modify this sample later 
// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}

exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}

// TODO: modify this sample later 
// @desc    Add quiz
// @route   POST /api/quizzes
// @access  Public
exports.addQuiz = async (req, res, next) => {
  try {
    const newQuiz = new Quiz({
      userId: req.body.userId,
      name: req.body.name,
      description: req.body.description,
      timed: req.body.timed, 
      retake: req.body.retake, 
      showQuestion: req.body.showQuestion, 
      showAnswer: req.body.showAnswer,
      likes: req.body.likes,
      created: req.body.created,
      EXP: req.body.EXP,
      questions: req.body.questions,
      answers: req.body.answers
    });
    const savedQuiz = await newQuiz.save();
    if (!savedQuiz) throw Error('Something went wrong saving the quiz');
    res.status(200).json({
      quiz: {
        id: savedQuiz.id,
        userId: savedQuiz.userId,
        name: savedQuiz.name,
        description: savedQuiz.description,
        timed: savedQuiz.timed, 
        retake: savedQuiz.retake, 
        showQuestion: savedQuiz.showQuestion, 
        showAnswer: savedQuiz.showAnswer,
        likes: savedQuiz.likes,
        created: savedQuiz.created,
        EXP: savedQuiz.EXP,
        questions: savedQuiz.questions,
        answers: savedQuiz.answers
      }
    }); 
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

exports.updateQuiz = async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
    id: req.body.id,
    userId: req.body.userId,
    name: req.body.name,
    description: req.body.description,
    timed: req.body.timed, 
    retake: req.body.retake, 
    showQuestion: req.body.showQuestion, 
    showAnswer: req.body.showAnswer,
    likes: req.body.likes,
    created: req.body.created,
    EXP: req.body.EXP,
    questions: req.body.questions,
    answers: req.body.answers
  });
  try {
    res.status(200).json({
      success: true,
      msg: "Quiz updated"
  });
    if (!quiz) {
        return res.status(404).json({
            success: false,
            msg: 'No quiz found'
        });
    }
  } catch (err) {
      return res.status(500).json({
          success: false,
          msg: 'Server Error'
      });
  }
}

// TODO: modify this sample later 
// @desc    Delete quiz
// @route   DELETE /api/quiz/:id
// @access  Public
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if(!quiz) {
      return res.status(404).json({
        success: false,
        msg: 'No quiz found'
      });
    }
    await quiz.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}