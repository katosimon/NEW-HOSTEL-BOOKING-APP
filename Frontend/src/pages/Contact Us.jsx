import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitted: false, submitting: false, error: null });
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: null });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: false, submitting: false, error: 'Please fill in all required fields.' });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus({ submitted: true, submitting: false, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ submitted: false, submitting: false, error: data.message });
      }
    } catch (err) {
      console.error(err);
      setStatus({ submitted: false, submitting: false, error: 'Something went wrong. Please try again later.' });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: 'Address', content: '123 Kampala Road, Lumumba, Uganda' },
    { icon: <FaPhone />, title: 'Phone', content: '+256 112 345 678' },
    { icon: <FaEnvelope />, title: 'Email', content: 'infosupport@hostelhub.com' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' }
  ];

  const faqs = [
    {
      question: "How do I book a hostel?",
      answer: "You can book a hostel by browsing our available hostels, selecting your preferred dates, and completing the booking form with your details. Payment can be made online or upon arrival depending on the hostel's policy."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through your account dashboard. Please note that cancellation policies vary by hostel, and some may have fees for late cancellations."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, mobile money, and bank transfers. The specific options available depend on the hostel's preferences."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and security measures to protect your payment information. Your details are processed securely and never shared with third parties."
    },
    {
      question: "Do I need to pay a deposit?",
      answer: "Some hostels require a deposit to secure your booking, while others allow full payment upon arrival. The deposit requirement will be clearly displayed during the booking process."
    },
    {
      question: "What amenities are typically included?",
      answer: "Most hostels include basic amenities like Wi-Fi, communal kitchen access, and bed linens. Additional amenities such as towels, breakfast, or air conditioning may vary by hostel."
    }
  ];

  return (
    <div className="contact-us-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </header>

      <div className="contact-content">
        <section className="contact-form-section">
          <h2>Send us a Message</h2>
          {status.error && <div className="alert alert-danger">{status.error}</div>}
          {status.submitted && <div className="alert alert-success">Thank you! Your message has been sent.</div>}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={status.submitting} className="btn btn-primary">
              {status.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        <section className="contact-info-section">
          <h2>Get in Touch</h2>
          {contactInfo.map(item => (
            <div className="info-item" key={item.title}>
              <span className="icon">{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              {socialLinks.map(social => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.name}
                  className="social-icon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
