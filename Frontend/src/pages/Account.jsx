import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextContext';
import axios from 'axios';

const Account = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        // Clear the location state to prevent message from showing again on refresh
        window.history.replaceState({}, document.title);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      
      setLoading(true);
      setError(null);
      
      axios.get('/api/bookings/my-bookings', config)
        .then(response => setBookings(response.data))
        .catch(error => {
          console.error('Error fetching bookings:', error);
          setError('Failed to load bookings. Please try again later.');
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setCancellingId(bookingId);
      
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        
        await axios.put(`/api/bookings/${bookingId}/cancel`, {}, config);
        
        setBookings(bookings.map(b => 
          b._id === bookingId ? {...b, status: 'cancelled'} : b
        ));
        
        setSuccessMessage('Booking cancelled successfully');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        setError('Failed to cancel booking. Please try again.');
      } finally {
        setCancellingId(null);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container">
      {/* Success Messages */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      
      {/* Error Messages */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            type="button" 
            className="close" 
            onClick={() => setError(null)}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <div className="grid grid-2">
        {/* Profile Section */}
        <div className="card">
          <div className="card-content text-center">
            <h2>My Profile</h2>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              margin: '20px auto', 
              background: '#e5e7eb', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: '#6b7280'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3>{user.name}</h3>
            <p className="card-text">{user.email}</p>
            {user.phone && <p className="card-text">{user.phone}</p>}
            <button onClick={handleLogout} className="btn btn-danger mt-20">
              Logout
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="card">
          <div className="card-content">
            <h3>My Bookings</h3>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p className="text-center mt-10">Loading your bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-40">
                <p className="mb-20">No bookings yet</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/hostels')}
                >
                  Browse Hostels
                </button>
              </div>
            ) : (
              <div>
                {bookings.map((booking) => (
                  <div key={booking._id} className="card mb-20">
                    <div className="card-content">
                      <div className="flex-between">
                        <div>
                          <h4>{booking.hostel.name}</h4>
                          <p className="card-text">{booking.hostel.location}</p>
                          <p className="card-text">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                          <p className="card-text text-small">
                            {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`badge ${
                            booking.status === 'confirmed' ? 'badge-success' :
                            booking.status === 'pending' ? 'badge-warning' :
                            'badge-danger'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <p className="price mt-10">${booking.totalAmount}</p>
                        </div>
                      </div>
                      {booking.status === 'pending' && (
                        <div className="mt-20">
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="btn btn-danger"
                            disabled={cancellingId === booking._id}
                          >
                            {cancellingId === booking._id ? (
                              <>
                                <span className="spinner-small"></span>
                                Cancelling...
                              </>
                            ) : (
                              'Cancel Booking'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
