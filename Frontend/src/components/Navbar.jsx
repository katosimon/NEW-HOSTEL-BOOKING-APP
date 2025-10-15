import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">HostelHub</Link>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search hostels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="nav-links">
          <Link to="/hostels">Hostels</Link>
           <Link to="/account" className="ml-10">Account</Link>

               {user ? (
            <div className="user-dropdown">
              <button onClick={toggleDropdown} className="user-btn">
                {user.name || 'Account'} ▼
              </button>
              
          {user ? (
            <div className="user-dropdown">
              <button onClick={toggleDropdown} className="user-btn">
                {user.name || 'Account'} ▼
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
              <Link to="/login">Login</Link>
             
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


