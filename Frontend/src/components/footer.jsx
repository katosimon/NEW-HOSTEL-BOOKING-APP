import React from 'react';
import { Link } from 'react-router-dom';
// install react-icons if you want to use icons(npm install react-icons)
import { FaFacebook, FaTwitter, FaInstagram, FaAppStoreIos, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <style>{`
        /* --- Footer Styles --- */
        .footer-container {
          background-color: #2c3e50; /* Dark slate blue */
          color: #ecf0f1; /* Light grayish white */
          padding: 40px 20px 20px;
          margin-top: auto; /* Pushes footer to the bottom if content is short */
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section h4 {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background-color: #3498db; /* Bright blue for accent */
        }

        .footer-logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #3498db;
          margin-bottom: 15px;
        }

        .footer-tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #bdc3c7; /* Muted gray for text */
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: 12px;
        }

        .footer-section ul li a {
          color: #bdc3c7;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-section ul li a:hover {
          color: #3498db;
          transform: translateX(5px);
        }

        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-icons a {
          color: #bdc3c7;
          font-size: 1.5rem;
          transition: color 0.3s ease;
        }

        .social-icons a:hover {
          color: #3498db;
        }

        .app-badges {
          margin-top: 15px;
        }

        .app-badges a {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          background-color: #34495e; /* Slightly lighter background */
          padding: 10px 15px;
          border-radius: 5px;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 10px;
          transition: background-color 0.3s ease;
        }

        .app-badges a:hover {
          background-color: #3498db;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #4a627a;
          font-size: 0.9rem;
          color: #95a5a6;
        }

        /* --- Responsive Design --- */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-section h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .social-icons {
            justify-content: center;
          }
          .app-badges a {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="footer-container">
        <div className="footer-content">
          {/* Column 1: Brand & About */}
          <div className="footer-section">
            <h2 className="footer-logo">HostelHub</h2>
            <p className="footer-tagline">
              Your gateway to affordable accomodation. Find, compare, and book the perfect hostel for your academic journey.
            </p>
            <div className="social-icons">
              {/* Uncomment to use icons */}
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a> 
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-section">
            <h4>Explore</h4>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hostels">Find Hostels</Link></li>
                
              </ul>
            </nav>
          </div>

          {/* Column 3: Support & Legal */}
          <div className="footer-section">
            <h4>Support</h4>
            <nav>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/contact">FAQs</Link></li>
             
              </ul>
            </nav>
          </div>

          {/* Column 4: Get the App */}
         
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HostelHub. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
