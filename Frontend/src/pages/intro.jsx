import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaShieldAlt, FaUsers, FaMapMarkerAlt, FaStar, FaCheck, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaWifi />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet throughout the property"
    },
    {
      icon: <FaShieldAlt />,
      title: "24/7 Security",
      description: "Your safety is our priority with round-the-clock security surveillance"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Locations",
      description: "Strategically located near Makerere University."
    }
  ];

  const handleIndicatorClick = (index) => {
    setActiveFeature(index);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to HostelHub</h1>
          <p className="hero-subtitle">
            Discover amazing hostels around Makerere. Meet fellow students, feel at home,he world without breaking the bank.
          </p>
          <div className="hero-buttons">
            <Link to="/hostels" className="btn btn-primary">
              Explore Hostels <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose HostelHub?</h2>
        <p className="section-subtitle">Experience the best of budget booking with home based hostels with better amenities</p>
        
        <div className="feature-carousel">
          <div className="feature">
            {features[activeFeature].icon}
            <h2>{features[activeFeature].title}</h2>
            <p>{features[activeFeature].description}</p>
          </div>
          <div className="feature-indicators">
            {features.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === activeFeature ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Your Gateway to Easy Hostel Booking</h2>
            <p>
              HostelHub is more than just a booking platform – we're a community of passionate individual 
              who believe that the best experiences come from comfortable feel at home accomodation.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <FaCheck className="check-icon" />
                <span>Verified Bookings</span>
              </div>
              <div className="highlight-item">
                <FaCheck className="check-icon" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="highlight-item">
                <FaCheck className="check-icon" />
                <span>Free Cancellation</span>
              </div>
              <div className="highlight-item">
                <FaCheck className="check-icon" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Learn More About Us <FaArrowRight />
            </Link>
          </div>
          <div className="about-image">
            <img src="https://picsum.photos/seed/hostel-interior/600/400.jpg" alt="Hostel Interior" />
            <div className="image-badge">
              <FaStar /> Trusted by 100K+ Travelers
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Join thousands of students who have made HostelHub their preferred choice for budget accommodations</p>
          <div className="cta-buttons">
            <Link to="/hostels" className="btn btn-primary">
              Book Your Stay <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
