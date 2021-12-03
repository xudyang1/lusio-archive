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
            msg: 'The Quiz does not exist.'
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

        const scoreB = [];
        const quizScoreboard = req.body.scoreBoard;
        quizScoreboard.forEach((u)=> {
            scoreB.push({
                userName: u.userName,
                userScore: u.userScore
            });
        });
        /*
        const commentsL = [];
        const comments = req.body.comments;
        comments.forEach((c)=> {
            commentsL.push({
                userId: c.userId,
                userName: c.userName,
                text: c.text,
                id: c.id
            });
        });
        */
        const newQuiz = new Quiz({
            userId: req.body.userId,
            platformId: req.body.platformId,
            name: req.body.name,
            author: req.body.author,
            quizImgURI: req.body.quizImgURI,
            description: req.body.description,
            timedOption: req.body.timedOption,
            time: req.body.time,
            questions: dataQ,
            likes: req.body.likes,
            plays: req.body.plays,
            isPublished: req.body.isPublished,
            scoreBoard: scoreB,
            comments: req.body.comments
        });

        const savedQuiz = await newQuiz.save();
        if (!savedQuiz) throw Error('Something went wrong saving the quiz');
        res.status(200).json({
            quiz: {
                id: savedQuiz._id,
                userId: savedQuiz.userId,
                platformId: savedQuiz.platformId,
                name: savedQuiz.name,
                author: savedQuiz.author,
                quizImgURI: savedQuiz.quizImgURI,
                description: savedQuiz.description,
                timedOption: savedQuiz.timedOption,
                time: savedQuiz.time,
                questions: savedQuiz.questions,
                likes: savedQuiz.likes,
                plays: savedQuiz.plays,
                isPublished: savedQuiz.isPublished,
                scoreBoard: savedQuiz.scoreBoard,
                comments: savedQuiz.comments
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
        platformId: req.body.platformId,
        name: req.body.name,
        author: req.body.author,
        quizImgURI: req.body.quizImgURI,
        description: req.body.description,
        timedOption: req.body.timedOption,
        time: req.body.time,
        questions: req.body.questions,
        likes: req.body.likes,
        plays: req.body.plays,
        isPublished: req.body.isPublished,
        scoreBoard: req.body.scoreBoard,
        comments: req.body.comments
    });
    try {
        res.status(200).json({
            quiz: quiz,
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