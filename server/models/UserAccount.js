const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// TODO: may have some add-ons
const UserAccountSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add an username']
    },
    email: { 
        type: String, 
        required: true, unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password']
        //TODO: protect sensitive info via: , select: false
    },
    registration_date: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);