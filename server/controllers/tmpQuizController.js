const Quiz = require('../models/tmpQuiz');
const { errorHandler, selectEntries } = require('../utils/jsonTool');

// TODO: Continue testing

/**
 * TODO: 
 * @desc  Get only quiz card information for displaying quiz cards
 * @route GET api/quizzes/cards
 * @access  Public
 * @detail  quiz questions content and some other fields are not loaded to minimize data size
 * @format  req.body: { quizzes: [{ _id: val }] }
 *          res.data: { quizzes: [{ _id, name, author, platform, description, tags, likes }] }
 */
exports.getQuizCards = async (req, res, next) => {
    try {

        if (!req.body.quizzes)
            return errorHandler(res, 400, 'Invalid payload');

        const fields = ['_id', 'name', 'author', 'platform', 'description', 'tags', 'likes'];
        const quizzes = await Quiz.find({ _id: { $in: req.body.quizzes } }).select(fields);
        console.log(quizzes)
        const result = selectEntries(quizzes, fields);

        return res.status(200).json({
            quizzes: result
        });

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};


/**
 * TODO: 
 * @desc  Get only quiz main page information, the quiz questions content are not loaded
 * @route GET api/quizzes/quiz/:quizId
 * @access  Public
 * @detail  Send different view type for owner and guest
 * @format  req.header('x-auth-token'): JWT token || null
 *          
 *          res.data: { 
 *                      viewType: "GUEST_VIEW" || "OWNER_VIEW", 
 *                      quiz: { }
 *                    }
 */
exports.getQuizWithoutQuestion = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};