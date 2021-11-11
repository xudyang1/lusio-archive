const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some add-ons
const UserAccountSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Please add an username'],
        // minlength: [3, 'Minimum 3 characters'],
        maxlength: [15, 'Maximum 15 characters']
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        maxlength: [256, 'Maximum 256 characters']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false
    },
    profile: { type: Schema.Types.ObjectId, ref: 'UserProfile' }
}, { timestamps: true });

module.exports = mongoose.model('UserAccount', UserAccountSchema);