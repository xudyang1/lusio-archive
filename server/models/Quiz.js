const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: defaults to be discussed
const QuestionSchema = new Schema({
    title: { 
        type: String, 
        //required: [true, 'Question title must be provided']
        default: ""
    },
    choices: [{ 
        content: {
            type: String, 
            default: ""
        }
    }],
    answerKey: { type: Number, required: [true, 'Answer key must be provided']},
    score: { type: Number, default: 50 }
});

// platformId to be added
// quizImgURI to be added
// quizScoreboard to be added 
const QuizSchema = new Schema({
    userId: {
        //type: Schema.Types.ObjectId,
        type: String,
        required: [true]
    },
    name: {
        type: String,
        default: ""
    },
    author: { 
        type: String, 
        default: ""
        //required: [true, 'Please add an author'] 
    },
    description: { 
        type: String,
        default: "" 
        //required: [true, 'Please add a description'] 
    },
    timedOption: { type: Boolean, default: false },
    time: { type: Number, default: 0 },
    retakeOption: { type: Boolean, default: false },
    questions:  {
        type: [QuestionSchema], 
        validate: [(val) => val.length <= 50, 'Number of questions are limited to 50']
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    plays: { 
        type: Number, 
        default: 0 
    },
    isPublished: { 
        type: Boolean, 
        required: [true]}
}, {timestamps: true});
// Validation for questions array size
// TODO: size limit to be discussed
module.exports = Quiz =  mongoose.model('Quiz', QuizSchema);