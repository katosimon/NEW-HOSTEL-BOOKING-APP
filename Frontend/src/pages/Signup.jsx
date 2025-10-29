import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';
import './Signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    hostelRegistrationNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between user and admin
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isAdmin) {
      // Admin registration logic
      result = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.hostelRegistrationNumber,
        formData.phone
      );
    } else {
      // Normal user registration logic
      result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );
    }

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-card-content">
          <h2 className="signup-title">{isAdmin ? 'Admin Register' : 'User Register'}</h2>
          <p className="signup-toggle-text">
            {isAdmin ? 'Register as a normal user? ' : 'Register as an admin? '}
            <span onClick={() => setIsAdmin(!isAdmin)} className="signup-toggle-link">
              Click here
            </span>
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {isAdmin ? (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Hostel Registration Number (Required)"
                    value={formData.hostelRegistrationNumber}
                    onChange={(e) => setFormData({ ...formData, hostelRegistrationNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Contact (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating account...' : isAdmin ? 'Register Admin' : 'Register User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
