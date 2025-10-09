import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContextContext';
import axios from 'axios';

const Account = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get('/api/bookings/my-bookings')
        .then(response => setBookings(response.data))
        .catch(error => console.error('Error fetching bookings:', error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Cancel this booking?')) {
      await axios.put(`/api/bookings/${bookingId}/cancel`);
      setBookings(bookings.map(b => 
        b._id === bookingId ? {...b, status: 'cancelled'} : b
      ));
    }
  };

  if (!user) return null;

  return (
    <div className="container">
      {location.state?.message && (
        <div className="alert alert-success">{location.state.message}</div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-content text-center">
            <h2>My Profile</h2>
            <div style={{ width: '80px', height: '80px', margin: '20px auto', background: '#e5e7eb', borderRadius: '50%' }}></div>
            <h3>{user.name}</h3>
            <p className="card-text">{user.email}</p>
            {user.phone && <p className="card-text">{user.phone}</p>}
            <button onClick={logout} className="btn btn-danger mt-20">Logout</button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>My Bookings</h3>
            {loading ? (
              <div className="loading"><div className="spinner"></div></div>
            ) : bookings.length === 0 ? (
              <p className="text-center">No bookings yet</p>
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
                        </div>
                        <div>
                          <span className={`badge ${
                            booking.status === 'confirmed' ? 'badge-success' :
                            booking.status === 'pending' ? 'badge-warning' :
                            'badge-danger'
                          }`}>
                            {booking.status}
                          </span>
                          <p className="price mt-10">${booking.totalAmount}</p>
                        </div>
                      </div>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="btn btn-danger"
                        >
                          Cancel Booking
                        </button>
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