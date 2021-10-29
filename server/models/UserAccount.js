const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: modify this sample later
const UserAccountSchema = new Schema({
    user_name: {
        type: String,
        required: [true, 'Please add an username']
    },
    user_email: { 
        type: String, 
        required: true, unique: true 
    },
    user_password: { 
        type: String, 
        required: [true, 'Please add a password'] 
    },
    registration_date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = UserAccountSchema = mongoose.model('UserAccount', UserAccountSchema);