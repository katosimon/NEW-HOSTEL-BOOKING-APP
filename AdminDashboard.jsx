import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContextContext';
import axios from 'axios';

const AdminDashboard = () => {
  useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, , hostelsRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/bookings'),
        axios.get('/api/hostels')
      ]);
      setStats(statsRes.data.stats);
      setBookings(statsRes.data.recentBookings);
      setHostels(hostelsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    await axios.put(`/api/admin/bookings/${bookingId}/status`, { status });
    fetchData();
  };

  const handleDeleteHostel = async (id) => {
    if (window.confirm('Delete this hostel?')) {
      await axios.delete(`/api/hostels/${id}`);
      fetchData();
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="flex gap-10 mb-20">
        {['dashboard', 'bookings', 'hostels'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-4 mb-20">
            <div className="card">
              <div className="card-content text-center">
                <h3>Total Hostels</h3>
                <p className="price">{stats.totalHostels}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content text-center">
                <h3>Total Users</h3>
                <p className="price">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content text-center">
                <h3>Total Bookings</h3>
                <p className="price">{stats.totalBookings}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content text-center">
                <h3>Pending</h3>
                <p className="price">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3>Recent Bookings</h3>
              {bookings.map((booking) => (
                <div key={booking._id} className="card mb-20">
                  <div className="card-content">
                    <div className="flex-between">
                      <div>
                        <h4>{booking.user.name} - {booking.hostel.name}</h4>
                        <p className="card-text">{new Date(booking.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`badge ${
                          booking.status === 'confirmed' ? 'badge-success' :
                          booking.status === 'pending' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {booking.status}
                        </span>
                        {booking.status === 'pending' && (
                          <div className="flex gap-10 mt-10">
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                              className="btn btn-success"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                              className="btn btn-danger"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="card">
          <div className="card-content">
            <h3>All Bookings</h3>
            {bookings.map((booking) => (
              <div key={booking._id} className="card mb-20">
                <div className="card-content">
                  <div className="flex-between">
                    <div>
                      <h4>{booking.user.name}</h4>
                      <p className="card-text">{booking.hostel.name}</p>
                      <p className="card-text">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p className="price">${booking.totalAmount}</p>
                    </div>
                    <div>
                      <span className={`badge ${
                        booking.status === 'confirmed' ? 'badge-success' :
                        booking.status === 'pending' ? 'badge-warning' :
                        'badge-danger'
                      }`}>
                        {booking.status}
                      </span>
                      {booking.status === 'pending' && (
                        <div className="flex gap-10 mt-10">
                          <button
                            onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                            className="btn btn-success"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                            className="btn btn-danger"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'hostels' && (
        <div>
          <div className="flex-between mb-20">
            <h3>Manage Hostels</h3>
            <button className="btn btn-primary">Add Hostel</button>
          </div>
          <div className="grid grid-3">
            {hostels.map((hostel) => (
              <div key={hostel._id} className="card">
                <div className="card-content">
                  <h4>{hostel.name}</h4>
                  <p className="card-text">{hostel.location}</p>
                  <p className="price">${hostel.price}/month</p>
                  <p className="card-text">{hostel.roomsAvailable} rooms available</p>
                  <div className="flex gap-10 mt-20">
                    <button className="btn btn-primary">Edit</button>
                    <button
                      onClick={() => handleDeleteHostel(hostel._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;