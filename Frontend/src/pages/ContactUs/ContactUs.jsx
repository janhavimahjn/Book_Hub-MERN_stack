import React, { useState } from "react";
import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";


const socialLinks = {
  facebook: "https://www.facebook.com/yourprofile",
  instagram: "https://www.instagram.com/yourprofile",
  twitter: "https://twitter.com/yourprofile",
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    review: "",
  });

  const [step, setStep] = useState(1); // 1: Contact Form, 2: Feedback Form, 3: Thank You
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  // Handle Contact Form Change
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Contact Form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://book-hub-mern-stack.onrender.com/api/feedback/submit",
        formData
      );
      setSuccessMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  // Handle Feedback Form Change
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  // Submit Feedback Form
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://book-hub-mern-stack.onrender.com/api/feedback/submit-feedback",
        feedbackData
      );
      setSuccessMessage(response.data.message);
      setStep(3);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="contact-container">
      {/* Step 1: Contact Form */}
      {step === 1 && (
        <div className="contact-content">
          <div className="left-section">
            <div className="follow-us">
              <h3>Follow Us</h3>
              <ul className="social-icons">
                {Object.keys(socialLinks).map((key) => (
                  <li key={key}>
                    <a
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={
                          key === "facebook"
                            ? faFacebook
                            : key === "instagram"
                            ? faInstagram
                            : faTwitter
                        }
                        className={`icon ${key}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="google-map">
              <h3>Find Us Here</h3>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Contact Us</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleContactChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Feedback Form */}
      {step === 2 && (
        <div className="feedback-section">
          <h3>Your Feedback Matters!</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <div className="form-group">
              <label className="rating-label">Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setFeedbackData({ ...feedbackData, rating: star })
                    }
                    className={`star ${
                      feedbackData.rating >= star ? "filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                rows="5"
                value={feedbackData.review}
                onChange={handleFeedbackChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Thank You Message */}
      {step === 3 && (
        <div className="contact-success">
          <h2>Thank You for Your Feedback!</h2>
          <p>We appreciate your time and will get back to you soon.</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
