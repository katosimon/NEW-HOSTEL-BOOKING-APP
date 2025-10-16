// Import React and required hooks
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import authentication context (for handling login)
import { useAuth } from '../context/AuthContextContext';

const Login = () => {
  // State to hold email and password input values
  const [formData, setFormData] = useState({ 
    email: '', 
    password: ''
  });
  
   // State to handle error messages
  const [error, setError] = useState('');
  // State to handle loading spinner while processing login
  const [loading, setLoading] = useState(false);

  // Access the login method from authentication context
  const { login } = useAuth();
    // Used for programmatic navigation
  const navigate = useNavigate();
  
 // Function to handle form submission
  const handleSubmit = async (e, isAdmin = false) => {
    e.preventDefault();// Prevent default page reload
    setLoading(true);// Show loading state
    setError(''); // Clear previous errors
    
// Call login function with email, password, and admin flag
    const result = await login(formData.email, formData.password, isAdmin);

    // If login is successful, navigate based on user type
    if (result.success) {
      if (isAdmin) {
        navigate('/admin/dashboard');// Redirect admin to admin dashboard
      } else {
        navigate('/');// Redirect regular user to home page
      }
    } else {
       // If login fails, display the error message
      setError(result.message);
    }
    setLoading(false); // Stop loading spinner
  };
  
  // Function to handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update state dynamically based on input name
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
        // Full-page centered container for the login form
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg" style={{ width: '1110px' }}>
        <div className="card-content text-center p-5">

           {/* App title */}
          <h1 className="display-5 fw-bold text-primary mb-3">HostelHub</h1>

            {/* Login heading */}
          <h2 className="mb-4">Login</h2>

            {/* Link to registration page */}
          <p className="card-text mb-4">
            Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
          </p>

            {/* Display error message if any */}
          {error && <div className="alert alert-danger mb-4">{error}</div>}

           {/* Regular user login form */}
          <form onSubmit={(e) => handleSubmit(e, false)} className="mb-4">
               {/* Email input */}
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

             {/* Password input */}
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Regular login button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                   {/* Spinner while loading */}
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider and admin login section */}
          <div className="mt-4 pt-4 border-top">
            <p className="text-muted mb-3">— OR —</p>

            {/* Admin login button */}
            <button 
              onClick={(e) => handleSubmit(e, true)}
              className="btn btn-outline-danger btn-lg w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Logging in...
                </>
              ) : (
                'Login as Administrator'
              )}
            </button>

              {/* Note about admin access */}
            <small className="text-muted d-block">
              <i className="bi bi-info-circle me-1"></i>
              Admin access requires special permissions.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



