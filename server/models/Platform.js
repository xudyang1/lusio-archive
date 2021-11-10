const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: edit defaults later
const PlatformSchema = new Schema({
    name: { type: String, required: [true, 'Please add a name'] },
    owner: {
        type: Schema.Types.ObjectId, ref: 'UserAccount',
        required: [true, 'Please add an owner']
    },
    admins: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
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
    visits: { type: Number, default: 0 },
    numSubscribers: { type: Number, default: 0 },
    quizSections: [{
        sectionName: { type: String },
        displayIndex: { type: Number, unique: true },
        sectionQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    }],
}, { timestamps: true });

module.exports = mongoose.model('Platform', PlatformSchema);