const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some add-ons
const UserAccountSchema = new Schema({
    name: { type: String, required: [true, 'Please add an username'] },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false
    },
    // TODO: manual set up or use pre/post middleware for default profile
    profile: { type: Schema.Types.ObjectId, ref: 'UserProfile' }
    // use timeStamp option instead
    // ,
    // registration_date: { 
    //     type: Date,
    //     default: Date.now 
    // }
}, { timestamps: true });

module.exports = mongoose.model('UserAccount', UserAccountSchema);