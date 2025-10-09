import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [formData, setFormData] = useState({ checkIn: '', checkOut: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/hostels/${id}`)
      .then(response => setHostel(response.data))
      .catch(error => console.error('Error fetching hostel:', error));
  }, [id]);

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !hostel) return 0;
    const days = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * hostel.price : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/bookings', {
        hostelId: id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut
      });
      navigate('/account', { state: { message: 'Booking successful!' } });
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!hostel) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-content">
          <h1>Book Your Stay</h1>
          
          <div className="card mb-20">
            <div className="card-content">
              <h3>{hostel.name}</h3>
              <p>{hostel.location}</p>
              <p className="price">${hostel.price}/month</p>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.checkOut}
                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="card mb-20">
              <div className="card-content">
                <div className="flex-between">
                  <span>Total Amount:</span>
                  <span className="price">${calculateTotal()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              <button
                type="button"
                onClick={() => navigate(`/hostel/${id}`)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;