const Feedback = require('../Model/Feedback');

// Handle contact form submission (step 1)
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
      rating: 1,  // Default rating (for contact form)
    });

    await feedback.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle feedback form submission (step 2)
const createFeedback = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({ message: 'Rating and review are required' });
    }

    // Assuming the user was already stored as part of the contact form submission
    const feedback = new Feedback({
      ...req.body,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createContact, createFeedback };
