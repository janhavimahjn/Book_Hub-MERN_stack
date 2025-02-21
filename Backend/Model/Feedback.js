const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
