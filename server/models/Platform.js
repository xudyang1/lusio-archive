const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: edit defaults later
const PlatformSchema = new Schema({
    name: { type: String, required: [true, 'Please add a name'] },
    owner: {
        type: Schema.Types.ObjectId, ref: 'UserProfile',
        required: [true, 'Platform owner is missing']
    },
    admins: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    description: { type: String, defualt: 'Default Platform Description' },
    bannerURI: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_960_720.png'
    },
    backgroundURI: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg'
    },
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    likes: { type: Number, default: 0 },
    // TODO: might be difficult to implement
    // visits: { type: Number, default: 0 },
    numSubscribers: { type: Number, default: 0 },
    quizSections: [{
        sectionName: { type: String },
        sectionIndex: { type: Number},
        sectionQuizzes: [{
            quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
            quizIndex: { type: Number}
        }],
    }],
}, { timestamps: true });

module.exports = mongoose.model('Platform', PlatformSchema);