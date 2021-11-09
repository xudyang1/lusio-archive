const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some add-ons
const UserProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserAccount', required: true },
    // accountStatus: { type: String, enum: ['active', 'suspended'] },
    description: { type: String, required: true /*TODO: add default*/ },
    iconURI: { type: String /*add, default: ''*/ },
    boarderURI: { type: String/*add, default: ''*/ },
    profileBanner: { type: String, required: true /*TODO: add default */ },
    level: { type: Number, default: 0 },
    currentExp: { type: Number, default: 0 },
    maxExp: { type: Number, required: true/*TODO: add default*/ },
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    quizzesTaken: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
    subscribedPlatforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);