const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a sample quiz schema
// TODO: modify this sample later
const QuizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Quiz = mongoose.model('Quiz', QuizSchema);