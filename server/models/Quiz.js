const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Discuss about defaults
const QuestionSchema = new Schema({
    title: { type: String, required: [true, 'Question title must be provided'] },
    timedOption: { type: Boolean, default: false },
    time: { type: Number, default: 0 },
    retakeOption: { type: Boolean, default: true },
    choices: [{
        index: {
            type: Number,
            required: [true, 'Index value must be provided for an answer choice']
        },
        content: {
            type: String,
            required: [true, 'Answer choice cannot be empty']
        }
    }],
    answerKey: { type: Number, required: [true, 'Answer key must be provided'] },
    score: { type: Number, default: 50 },
    validate: [arrayLimit]
});
// Validation for choices array size
QuestionSchema.path('choices').validate(function (value) {
    console.log(value.length);
    // TODO: discuss limit
    if (value.length > 10) {
        throw new Error("Choice size can't be greater than 10!");
    }
});

const QuizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    author: { type: Schema.Types.ObjectId, required: [true, 'Please add an author'] },
    description: { type: String, required: [true, 'Please add a description'] },
    likes: { type: Number, default: 0 },
    quesitons: [QuestionSchema]
}, { timestamps: true });
// Validation for questions array size
QuizSchema.path('questions').validate(function (value) {
    console.log(value.length);
    // TODO: discuss size limit
    if (value.length > 50) {
        throw new Error("No more than 50 quizzes allowed");
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);