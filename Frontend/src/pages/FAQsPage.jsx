import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  // State to track which FAQ item is currently open
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data array - easy to add, remove, or edit questions
  const faqData = [
    {
      id: 1,
      question: "How do I make a booking?",
      answer: "Making a booking is simple! Search for your destination, select a hostel, choose your dates and room type, and click 'Book Now'. You'll be prompted to log in or create an account and then proceed to the secure payment page to confirm your reservation."
    },
    {
      id: 2,
      question: "How will I know if my booking is confirmed?",
      answer: "Once your payment is successfully processed, you will receive a booking confirmation email immediately. This email will contain all the details of your reservation, including the hostel's contact information and your booking reference number. You can also view your confirmed bookings in your user dashboard."
    },
    {
      id: 3,
      question: "What is the cancellation policy?",
      answer: "Cancellation policies are set by the individual hostels and vary by property and rate type. The specific policy for your booking will be clearly displayed on the checkout page before you make your payment and in your confirmation email. Please review it carefully, as some bookings may be non-refundable."
    },
    {
      id: 4,
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through your HostelHub dashboard or by following the link in your confirmation email. However, changes and cancellations are subject to the hostel's specific policy, and you may incur a fee or not be eligible for a refund."
    },
    {
      id: 5,
      question: "Is my payment information secure?",
      answer: "Absolutely. We take security very seriously. All payment transactions are processed using industry-standard SSL encryption technology. We do not store your full credit card details on our servers; they are handled directly by our certified and secure third-party payment partners."
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), as well as debit cards. The availability of other payment methods like PayPal or digital wallets may vary depending on your location."
    },
    {
      id: 7,
      question: "Do I need to pay a security deposit?",
      answer: "Some hostels may require a security deposit for potential damages or incidentals. This is not charged by HostelHub but is handled directly by the hostel upon your arrival. Details about any required deposit will be in the hostel's information on their listing page."
    },
    {
      id: 8,
      question: "I forgot my password. How can I reset it?",
      answer: "No problem! Click on the 'Log In' button and then select the 'Forgot Password?' link. Enter the email address associated with your account, and we will send you instructions on how to create a new password."
    },
    {
      id: 9,
      question: "Can I book a bed in a dormitory for a group?",
      answer: "Booking multiple beds in the same dormitory is possible, but it is subject to availability. We recommend booking as early as possible, especially for larger groups. If you can't book all beds in one transaction, you may need to make separate bookings."
    },
    {
      id: 10,
      question: "What if I have a problem during my stay?",
      answer: "Your first point of contact should always be the hostel staff, as they are best equipped to resolve on-site issues immediately. If the problem is not resolved or relates to your booking with HostelHub, please contact our customer support team through the 'Help' section in your account."
    }
  ];

  const handleToggle = (index) => {
    // If clicking the already open item, close it. Otherwise, open the clicked item.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        .faq-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .faq-header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .faq-header p {
          font-size: 1.1rem;
          color: #777;
        }

        .faq-item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 15px;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .faq-item:hover {
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .faq-question {
          width: 100%;
          padding: 20px;
          font-size: 1.1rem;
          font-weight: 600;
          text-align: left;
          background-color: #f8f9fa;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .faq-question:hover {
          background-color: #e9ecef;
        }

        .faq-question.active {
          background-color: #3498db;
          color: white;
        }

        .faq-question::after {
          content: '+';
          font-size: 1.5rem;
          font-weight: 300;
          transition: transform 0.3s ease;
        }

        .faq-question.active::after {
          transform: rotate(45deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
          padding: 0 20px;
          line-height: 1.6;
          color: #555;
        }

        .faq-answer.active {
          max-height: 500px; /* A value large enough to fit the content */
          padding: 20px;
        }

        .faq-contact {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .faq-contact h2 {
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .faq-contact a {
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .faq-contact a:hover {
            background-color: #2980b9;
        }
      `}</style>

      <div className="faq-container">
        <header className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about HostelHub.</p>
        </header>

        <main>
          {faqData.map((faq, index) => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleToggle(index)}
              >
                {faq.question}
              </button>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </main>

      </div>
    </>
  );
};

export default FAQPage;