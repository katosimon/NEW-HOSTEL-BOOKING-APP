import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/hostels?search=${search.trim()}`);
      setSearch('');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">HostelHub</Link>

       
        {location.pathname === '/hostels' && (
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search hostels by city or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}

        <div className="nav-links">
          <Link to="/hostels">Hostels</Link>
          <Link to="/contact">Contact Us</Link>
          
          {user ? (
            <div className="user-dropdown">
              <button onClick={toggleDropdown} className="user-btn">
                {user.name || 'Account'} <span className="dropdown-arrow">▼</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/account" onClick={() => setShowDropdown(false)}>My Account</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowDropdown(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/account">Account</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
