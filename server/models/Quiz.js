const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// may modify this sample later
const QuizSchema = new Schema({
    userId: {
        type: String,
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
    likes: {
        type: Number,
        required: [true]
    },
    created: {
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