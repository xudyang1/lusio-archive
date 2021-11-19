const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Discuss about defaults
const QuestionSchema = new Schema({
    content: { type: String, required: [true, 'Question content must be provided'] },
    choices: {
        type: [{
            index: {
                type: Number,
                required: [true, 'Index value must be provided for an answer choice']
            },
            content: {
                type: String,
                required: [true, 'Answer choice cannot be empty']
            }
        }],
        validate: [(val) => { return val.length <= 10; }, "Choice size cannot be greater than 10!"]
    },
    answerKey: { type: Number, required: [true, 'Answer key must be provided'] },
    score: { type: Number, default: 10, min: 1, max: 50 }
});
// Validation for choices array size
// QuestionSchema.path('choices').validate(function (value) {
//     console.log("Quiz Question choice array length validator: ", value.length);
//     // TODO: discuss limit
//     if (value.length > 10) {
//         throw new Error("Choice size can't be greater than 10!");
//     }
// });


const QuizSchema = new Schema({
    name: { type: String, required: [true, 'Please provide a quiz name'] },
    author: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
    platform: { type: Schema.Types.ObjectId, ref: 'Platform' },
    description: { type: String, required: [true, 'Please add a description'] },
    likes: { type: Number, default: 0 },
    // TODO: tags should be carefully treated, string or ObjectId
    tags: [{type: String}],
    options: {
        timed: { type: Boolean, default: false, time: { type: Number, default: 0 } },
        retake: { type: Boolean, default: true },
        showAnswer: { type: Boolean, default: true },
        oneQuestionPerPage: { type: Boolean, default: false }
    },
    quesitons: {
        type: [QuestionSchema],
        validate: [(val) => { return val.length <= 50; }, 'No more than 50 questions allowed']
    },
    totalQuestions: { type: Number, default: 0},
    totalScore: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });
// Validation for questions array size
// QuizSchema.path('questions').validate(function (value) {
//     console.log(value.length);
//     // TODO: discuss size limit
//     if (value.length > 50) {
//         throw new Error("No more than 50 quizzes allowed");
//     }
// });

module.exports = mongoose.model('Quiz', QuizSchema);