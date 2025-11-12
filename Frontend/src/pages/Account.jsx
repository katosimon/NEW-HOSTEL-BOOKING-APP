import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import image1 from '../assets/pic1.jpg';

const Account = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); // ✅ for booker info from backend

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    if (!authLoading && user) {
      axios
        .get('http://localhost:8000/api/bookings', {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => {
          // ✅ Update both bookings and profile info
          setBookings(response.data.data || []);
          setProfile(response.data.user || user); // fallback to auth user if backend didn't send
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
          toast.error('Failed to fetch bookings.');
        })
        .finally(() => setLoading(false));
    } else if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) return <div className="loading">Checking login status...</div>;
  if (!user) return null;

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Cancel this booking?')) {
      try {
        await axios.put(
          `http://localhost:8000/api/bookings/${bookingId}/cancel`,
          {},
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: 'cancelled' } : b
          )
        );
        toast.success('Booking cancelled successfully!');
      } catch (error) {
        console.error('Cancellation failed:', error);
        toast.error('Cancellation failed.');
      }
    }
  };

  return (
    <div className="container">
      <Toaster position="top-right" />

      {location.state?.message && (
        <div className="alert alert-success">{location.state.message}</div>
      )}

      <div className="grid grid-2">
        {/* Profile Section */}
        <div className="card">
          <div className="card-content text-center">
            <h2>My Profile</h2>
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '20px auto',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                src={image1}
                alt="Profile Picture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* ✅ Now using backend profile info if available */}
            <h3>{profile?.name || 'Loading Name...'}</h3>
            <p className="card-text">{profile?.email || 'Loading Email...'}</p>
            <button onClick={logout} className="btn btn-danger mt-20">
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
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-center">No bookings yet</p>
            ) : (
              <div>
                {bookings.map((booking) => (
                  <div key={booking._id} className="card mb-20">
                    <div className="card-content">
                      <div className="flex-between">
                        <div>
                          <h4>
                            {booking.hostelBooked?.name || 'Hostel Name N/A'}
                          </h4>
                          <p className="card-text">
                            {booking.hostelBooked?.location || 'Location N/A'}
                          </p>
                          {/* ✅ Show date */}
                          <small>
                            Booked on:{' '}
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <div>
                          <span
                            className={`badge ${
                              booking.status === 'confirmed'
                                ? 'badge-success'
                                : booking.status === 'pending'
                                ? 'badge-warning'
                                : 'badge-danger'
                            }`}
                          >
                            {booking.status || 'pending'}
                          </span>
                        </div>
                      </div>
                      {(booking.status || 'pending') === 'pending' && (
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
