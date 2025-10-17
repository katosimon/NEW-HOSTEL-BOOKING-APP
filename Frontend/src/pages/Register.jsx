// Import React and required hooks
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import authentication context to handle user registration
import { useAuth } from '../context/AuthContextContext';

const Register = () => {
  // State to store user input data for the registration form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  // State for displaying error messages (e.g., registration failure)
  const [error, setError] = useState('');

  // State for showing loading indicator during registration process
  const [loading, setLoading] = useState(false);

  // Extract the register function from authentication context
  const { register } = useAuth();

  // useNavigate hook is used to redirect users after successful registration
  const navigate = useNavigate();

  // Handle form submission when user clicks the Register button
  const handleSubmit = async (e) => {
    e.preventDefault();// Prevent page reload
    setLoading(true);// Start loading spinner or disable button
    setError('');// Clear any previous error message

    // Call the register function from context and wait for the result
    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );
    
    // If registration is successful, redirect user to homepage
    if (result.success) {
      navigate('/');
    } else {
      // Otherwise, show error message returned from backend or context
      setError(result.message);
    }

    // Stop the loading indicator once done
    setLoading(false);
  };

  return (
    // Main container centered using custom flex-center class
    <div className="container flex-center">
      <div className="card" style={{ width: '1111px' }}>
        <div className="card-content text-center">
          <h2>Register</h2>
          <p className="card-text">Already have an account? <Link to="/login">Login</Link></p>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


