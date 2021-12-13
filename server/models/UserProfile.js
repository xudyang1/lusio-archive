const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: discuss about defaults
// TODO: determine the format of banner? bannerURI
const UserProfileSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, ref: 'UserAccount',
        select: false,
        required: [true, 'The owner of the profile is missing']
    },
    name: { type: String, required: [true, 'User name is missing'] },
    platformsCreated: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
    quizzesCreated: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    // TODO: uncomment this part after adding report system
    // accountStatus: { type: String, enum: ['active', 'suspended'], default: 'active' },
    description: { type: String, default: 'Hello World!' },
    iconURI: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png'
    },
    /*TODO: need boarderURI or not */
    // boarderURI: { type: String/* add default: ''*/ },
    bannerURI: {
        type: String,
        default: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/162788448/original/57ec2876b1b13f69cd3b3baf81f5d4035aa3c7eb/design-your-profile-banner-for-social-media.png'
    },
    level: { type: Number, default: 0 },
    currentExp: { type: Number, default: 0 },
    maxExp: { type: Number, default: 500 },
    achievements: [{ 
                    activatedTime: Date, 
                    badge: { type: Schema.Types.ObjectId, ref: 'Badge' } 
                }],
    quizzesTaken: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    //quizzes scores added for personal score db
    quizzesScore: [{
        type: String,
        default: ""
    }],
    likedQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    subscribedPlatforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
    fans: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }]
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);