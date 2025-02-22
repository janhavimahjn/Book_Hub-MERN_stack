import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true }
}, { timestamps: true });

export default model('Feedback', feedbackSchema);
