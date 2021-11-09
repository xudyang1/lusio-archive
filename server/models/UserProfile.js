const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: may have some add-ons
const UserProfileSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    accountStatus: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profileIcon: {
        type: String,
        required: true
    },
    profileBanner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    currentExp: {
        type: Number,
        required: true
    },
    maxExp: {
        type: Number,
        required: true
    },
    achievements: {
        type: [ObjectId],
        required: true
    },
    quizzes: {
        type: [ObjectId],
        required: true
    },
    subscribedUser: {
        type: [ObjectId],
        required: true
    },
    subscribedPlat: {
        type: [ObjectId],
        required: true
    },
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);