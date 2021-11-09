const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a sample platform schema
// TODO: modify this sample later
const SectionSchema = new Schema({
    secName: String,
    quizids: [Number]
});

const PlatformSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    numSubs: Number,
    owner: ObjectId,
    admins: [ObjectId],
    sections:[SectionSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Platform = mongoose.model('Platform', PlatformSchema);