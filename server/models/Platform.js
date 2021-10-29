const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// a sample platform schema
// TODO: modify this sample later
const PlatformSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Platform = mongoose.model('Platform', PlatformSchema);