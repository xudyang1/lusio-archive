const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a sample quiz schema
// TODO: modify this sample later
const QuestionShema = new Schema({
    questionTitle: String,
    question_option_timed: Boolean,
    question_option_time: Number,
    question_option_retake: Boolean,
    choices:[String],
    correct: Number,
    score: Number
});

const QuizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    likes: Number,
   author: String,
    quesitons: [QuestionShema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);