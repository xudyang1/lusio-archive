const Quiz = require('../models/Quiz');
//const tmpQuiz = require('../models/tmpQuiz2');

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
        if (quiz)
            return res.status(200).json({
                success: true,
                data: quiz
            });
        return res.status(404).json({
            success: false,
            msg: 'The quiz does not exist.'
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
        const dataA = [];
        const dataQ = [];

        const questionsToPut = req.body.questions;
        questionsToPut.forEach((q) => {
            const answersToPut = q.choices;
            answersToPut.forEach((a) => {
                dataA.push({
                    content: a.content
                });
            });
            dataQ.push({
                title: q.title,
                choices: dataA,
                answerKey: q.answerKey,
                score: q.score
            });
        });

        const newQuiz = new Quiz({
            userId: req.body.userId,
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            timedOption: req.body.timedOption,
            time: req.body.time,
            retakeOption: req.body.retakeOption,
            questions: dataQ,
            likes: req.body.likes,
            plays: req.body.plays,
            isPublished: req.body.isPublished
        });

        const savedQuiz = await newQuiz.save();
        if (!savedQuiz) throw Error('Something went wrong saving the quiz');
        res.status(200).json({
            quiz: {
                id: savedQuiz._id,
                userId: savedQuiz.userId,
                name: savedQuiz.name,
                author: savedQuiz.author,
                description: savedQuiz.description,
                timedOption: savedQuiz.timedOption,
                time: savedQuiz.time,
                retakeOption: savedQuiz.retakeOption,
                questions: savedQuiz.questions,
                likes: savedQuiz.likes,
                plays: savedQuiz.plays,
                isPublished: savedQuiz.isPublished
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
        author: req.body.author,
        description: req.body.description,
        timedOption: req.body.timedOption,
        time: req.body.time,
        retakeOption: req.body.retakeOption,
        questions: req.body.questions,
        likes: req.body.likes,
        plays: req.body.plays,
        isPublished: req.body.isPublished
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

/*
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
        answers: req.body.answers,
        isPublished: req.body.isPublished
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
*/

// TODO: modify this sample later 
// @desc    Delete quiz
// @route   DELETE /api/quiz/:id
// @access  Public
exports.deleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
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