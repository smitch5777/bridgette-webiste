import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: process.env.REACT_APP_ARTIST_EMAIL,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <section className="contact-intro">
          <h1>Get in Touch</h1>
          <p>
            I'd love to hear from you! Whether you're interested in purchasing 
            existing work, commissioning a custom piece, or just want to say hello, 
            please don't hesitate to reach out.
          </p>
        </section>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="status-message success">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message error">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>

          <div className="contact-info">
            <h2>Other Ways to Connect</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h3>Commission Inquiries</h3>
                <p>
                  Interested in a custom piece? I'd love to work with you to 
                  create something special. Please include details about your 
                  vision, preferred medium, and timeline.
                </p>
              </div>

              <div className="contact-item">
                <h3>Existing Artwork</h3>
                <p>
                  Questions about pieces in my galleries? Feel free to ask about 
                  pricing, dimensions, materials, or anything else you'd like to know.
                </p>
              </div>

              <div className="contact-item">
                <h3>General Inquiries</h3>
                <p>
                  Have questions about my process, upcoming shows, or just want 
                  to chat about art? I always enjoy connecting with fellow art 
                  enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;