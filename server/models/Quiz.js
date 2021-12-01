const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        default: ""
    },
    userScore: {
        type: Number,
        default: 0
    }
}, { _id : false })

const CommentSchema = new Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    text: {
        type: String,
        default: ""
    },
    id: {
        type: Number,
    }
})

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
const QuizSchema = new Schema({
    userId: {
        //type: Schema.Types.ObjectId,
        type: String,
        required: [true]
    },
    platformId: {
        //type: Schema.Types.ObjectId to be changed after connection made with Platform
        type: String
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
    quizImgURI: {
        type: String,
        default: ""
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
        required: [true]
    },
    scoreBoard: {
        type: [UserSchema]
    },
    comments: {
        type: [CommentSchema]
    }
}, {timestamps: true});
// Validation for questions array size
// TODO: size limit to be discussed
module.exports = Quiz =  mongoose.model('Quiz', QuizSchema);