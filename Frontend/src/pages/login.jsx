import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e, isAdmin = false) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password, isAdmin);
    if (result.success) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg" style={{ width: '1110px' }}>
        <div className="card-content text-center p-5">
          <h1 className="display-5 fw-bold text-primary mb-3">HostelHub</h1>
          
          <h2 className="mb-4">Login</h2>
          
          <p className="card-text mb-4">
            Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link>
          </p>
          
          {error && <div className="alert alert-danger mb-4">{error}</div>}
          
          <form onSubmit={(e) => handleSubmit(e, false)} className="mb-4">
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
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <div className="mt-4 pt-4 border-top">
            <p className="text-muted mb-3">— OR —</p>
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

