import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => {
  const lastUpdatedDate = "October 26, 2023";

  return (
    <>
      <style>{`
        .terms-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #333;
          line-height: 1.7;
        }

        .terms-header {
          text-align: center;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .terms-header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .terms-header p {
          font-size: 0.9rem;
          color: #777;
        }

        .terms-content h2 {
          font-size: 1.8rem;
          color: #34495e;
          margin-top: 40px;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }

        .terms-content h3 {
          font-size: 1.3rem;
          color: #3498db;
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .terms-content p, .terms-content li {
          font-size: 1rem;
          margin-bottom: 15px;
        }

        .terms-content ul {
          padding-left: 20px;
        }

        .terms-content strong {
          color: #2c3e50;
        }

        .table-of-contents {
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .table-of-contents h3 {
          margin-top: 0;
          color: #2c3e50;
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .table-of-contents ul {
          list-style-type: none;
          padding-left: 0;
        }

        .table-of-contents li {
          margin-bottom: 8px;
        }

        .table-of-contents a {
          color: #3498db;
          text-decoration: none;
          font-weight: 500;
        }

        .table-of-contents a:hover {
          text-decoration: underline;
        }

        .legal-disclaimer {
          background-color: #fffbe6;
          border-left: 5px solid #ffe58f;
          padding: 15px;
          margin-bottom: 30px;
        }
        .legal-disclaimer p {
          margin-bottom: 0;
        }

        .back-to-home {
            text-align: center;
            margin-top: 40px;
        }
        .back-to-home a {
            background-color: #3498db;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .back-to-home a:hover {
            background-color: #2980b9;
        }
      `}</style>

      <div className="terms-container">
        <header className="terms-header">
          <h1>Terms of Service</h1>
          <p><strong>Last Updated:</strong> {lastUpdatedDate}</p>
        </header>

        <main className="terms-content">
          <div className="legal-disclaimer">
            <p><strong>Disclaimer:</strong> This document is a template and does not constitute legal advice. Please consult with a legal professional to ensure your Terms of Service are complete and compliant with all applicable laws.</p>
          </div>

          <div className="table-of-contents">
            <h3>Table of Contents</h3>
            <ul>
              <li><a href="#1-acceptance-of-terms">1. Acceptance of Terms</a></li>
              <li><a href="#2-description-of-service">2. Description of Service</a></li>
              <li><a href="#3-user-accounts">3. User Accounts</a></li>
              <li><a href="#4-hostel-listings-and-bookings">4. Hostel Listings and Bookings</a></li>
              <li><a href="#5-payments-and-fees">5. Payments and Fees</a></li>
              <li><a href="#6-cancellations-and-refunds">6. Cancellations and Refunds</a></li>
              <li><a href="#7-user-conduct-and-reviews">7. User Conduct and Reviews</a></li>
              <li><a href="#8-intellectual-property">8. Intellectual Property</a></li>
              <li><a href="#9-privacy">9. Privacy</a></li>
              <li><a href="#10-disclaimer-of-warranties">10. Disclaimer of Warranties</a></li>
              <li><a href="#11-limitation-of-liability">11. Limitation of Liability</a></li>
              <li><a href="#12-governing-law">12. Governing Law</a></li>
              <li><a href="#13-changes-to-terms">13. Changes to Terms</a></li>
              <li><a href="#14-contact-information">14. Contact Information</a></li>
            </ul>
          </div>

          <section id="1-acceptance-of-terms">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using HostelHub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </section>

          <section id="2-description-of-service">
            <h2>2. Description of Service</h2>
            <p>HostelHub is an online platform that connects travelers ("Users") with hostel owners ("Hostels"). We facilitate the search, comparison, and booking of hostel accommodations. HostelHub acts as an intermediary and is not the owner, operator, or manager of any listed hostel. The actual contract for accommodation is between the User and the Hostel.</p>
          </section>

          <section id="3-user-accounts">
            <h2>3. User Accounts</h2>
            <p>To book a hostel, you must create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must provide accurate, current, and complete information as prompted by our registration form.</p>
          </section>

          <section id="4-hostel-listings-and-bookings">
            <h2>4. Hostel Listings and Bookings</h2>
            <p>Hostels are responsible for the accuracy of their listings, including descriptions, photos, amenities, and availability. HostelHub does not verify the accuracy of this information. A booking constitutes a direct agreement between you and the Hostel, subject to the Hostel's own terms and conditions.</p>
          </section>

          <section id="5-payments-and-fees">
            <h2>5. Payments and Fees</h2>
            <p>HostelHub facilitates payments on behalf of the Hostel. When you make a booking, you agree to pay the total price, which includes the cost of the stay and any applicable taxes, as well as a HostelHub service fee. All payments are processed securely through our third-party payment providers.</p>
          </section>

          <section id="6-cancellations-and-refunds">
            <h2>6. Cancellations and Refunds</h2>
            <p>Cancellation and refund policies are determined solely by the individual Hostel. These policies are clearly displayed on the listing page before you confirm your booking. By booking, you agree to the Hostel's specific cancellation policy. The HostelHub service fee is non-refundable in the event of a cancellation.</p>
          </section>

          <section id="7-user-conduct-and-reviews">
            <h2>7. User Conduct and Reviews</h2>
            <p>You agree not to use the service for any unlawful purposes or to solicit others to perform or participate in any unlawful acts. You may submit reviews of hostels you have stayed at. Reviews must be honest, accurate, and based on your own experience. We reserve the right to remove any review that we believe to be false, defamatory, or in violation of these terms.</p>
          </section>

          <section id="8-intellectual-property">
            <h2>8. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of HostelHub and its licensors. The service is protected by copyright, trademark, and other laws. You may not modify, reproduce, distribute, create derivative works, or publicly display any content from the service without our express written permission.</p>
          </section>

          <section id="9-privacy">
            <h2>9. Privacy</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.</p>
          </section>

          <section id="10-disclaimer-of-warranties">
            <h2>10. Disclaimer of Warranties</h2>
            <p>The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the service or the information, content, materials, or products included on this service.</p>
          </section>

          <section id="11-limitation-of-liability">
            <h2>11. Limitation of Liability</h2>
            <p>In no event shall HostelHub, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
          </section>

          <section id="12-governing-law">
            <h2>12. Governing Law</h2>
            <p>These Terms shall be interpreted and governed by the laws of the State of [Your State/Country], without regard to its conflict of law provisions.</p>
          </section>

          <section id="13-changes-to-terms">
            <h2>13. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. Your continued use of the Service after the effective date of the revised Terms constitutes acceptance of the changes.</p>
          </section>

          <section id="14-contact-information">
            <h2>14. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@hostelhub.com">legal@hostelhub.com</a>.</p>
          </section>
        </main>

        <div className="back-to-home">
            <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;