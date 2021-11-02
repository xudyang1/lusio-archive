const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: may have some add-ons
const UserProfileSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    bannerURI: { 
        type: String, 
        required: true
    },
    profileIconURI: { 
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);