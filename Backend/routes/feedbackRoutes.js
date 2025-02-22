import { Router } from 'express';
const router = Router();
import Contact from '../Model/Contact.js';
import Feedback from '../Model/Feedback.js';

// 📌 Contact Form Submission Endpoint
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: '' });
    } catch (error) {
        console.error('Error submitting contact request:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
});

// 📌 Feedback Form Submission Endpoint
router.post('/submit-feedback', async (req, res) => {
    try {
        const { rating, review } = req.body;

        if (!rating || !review) {
            return res.status(400).json({ message: 'Rating and review are required' });
        }

        const newFeedback = new Feedback({ rating, review });
        await newFeedback.save();

        res.status(201).json({ message: '' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Server error, please try again' });
    }
});

export default router;
