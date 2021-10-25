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

// TODO: modify this sample later 
// @desc    Add quiz
// @route   POST /api/quizzes
// @access  Public
exports.addQuiz = async (req, res, next) => {
  try {
    const { name } = req.body;

    const quiz = await Quiz.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: quiz
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        msg: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: 'Server Error'
      });
    }
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