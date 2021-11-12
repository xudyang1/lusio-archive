const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// <<<<<<< Dajung
// // may modify this sample later
// =======
// // a sample quiz schema
// // TODO: modify this sample later
// const QuestionShema = new Schema({
//     questionTitle: String,
//     question_option_timed: Boolean,
//     question_option_time: Number,
//     question_option_retake: Boolean,
//     choices:[String],
//     correct: Number,
//     score: Number
// });

// >>>>>>> main
const QuizSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true]
    },
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    timed: {
        type: Boolean,
        default: false
    },
    retake: {
        type: Boolean,
        default: false
    },
    showQuestion: {
        type: Boolean,
        default: false
    },
    showAnswer: {
        type: Boolean,
        default: false
    },
// <<<<<<< Dajung
    likes: {
        type: Number,
        required: [true]
    },
    created: {
// =======
//     likes: Number,
//    author: String,
//     quesitons: [QuestionShema],
//     date: {
// >>>>>>> main
        type: Date,
        default: Date.now
    },
    EXP: {
        type: Number,
        required: [true]
    },
    questions: {
        type: [String],
        required: [true]
    },
    answers: {
        type: [String],
        required: [true]
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);