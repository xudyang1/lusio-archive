const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: may have some add-ons
const BadgeSchema = new Schema({
    title: { type: String, required: [true, 'Please add a name'] },
    description: { type: String, required: [true, 'Please add description'] },
    imageURI: { type: String, required: [true, 'Please add a badge image'] },
    requirement: [{target_field: String, value: num}]
}, { timestamps: true });

module.exports = mongoose.model('Badge', BadgeSchema);