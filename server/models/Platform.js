const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some addon
const PlatformSchema = new Schema({
    name: { type: String, required: [true, 'Please add a name'] },
    owner: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
    admins: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
    fans: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
    description: { type: String /*TODO: add, default: '' */ },
    bannerURI: { type: String /*TODO: add, default: 'defaultURI'*/ },
    backgroundURI: { type: String /*TODO: add, default: 'defaultURI'*/ },
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    likes: { type: Number, default: 0 },
    visits: { type: Number, default: 0 },
    subscribers: { type: Number, default: 0 },
    quizSections: [{
        sectionName: { type: String },
        displayIndex: { type: Number, unique: true },
        sectionQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    }],
}, { timestamps: true }
);

module.exports = mongoose.model('Platform', PlatformSchema);