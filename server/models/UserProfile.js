const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: discuss about defaults
const UserProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserAccount', required: true },
    platformsCreated: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
    quizzesCreated: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    // accountStatus: { type: String, enum: ['active', 'suspended'] },
    description: { type: String, default: 'Hello, World!' },
    iconURI: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png'
    },
    /*TODO: need boarderURI or not */
    // boarderURI: { type: String/* add default: ''*/ },
    profileBanner: {
        type: String,
        defualt: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/162788448/original/57ec2876b1b13f69cd3b3baf81f5d4035aa3c7eb/design-your-profile-banner-for-social-media.png'
    },
    level: { type: Number, default: 0 },
    currentExp: { type: Number, default: 0 },
    maxExp: { type: Number, default: 500 },
    achievements: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    quizzesTaken: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserAccount' }],
    subscribedPlatforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);