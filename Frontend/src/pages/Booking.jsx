import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Access current user

const Booking = () => {
  const { id } = useParams(); // Hostel ID from URL
  const [hostel, setHostel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hostels/${id}`);
        setHostel(response.data.data || response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load hostel details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHostel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You must be logged in to book a hostel.');
      navigate('/login');
      setIsLoading(false);
      return;
    }

    try {
      // --- Post booking with Authorization header ---
      const response = await axios.post(
        'http://localhost:8000/api/bookings',
        { hostelId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking confirmed successfully for the semester!');
      navigate('/account', { state: { message: 'Booking added successfully!' } });

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Booking failed.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !hostel) {
    return <div className="loading" style={{ padding: '20px', textAlign: 'center' }}>Loading hostel details...</div>;
  }

  return (
    <div className="container">
      <Toaster position="top-right" />
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-content text-center">
          <h1>Confirm Booking at {hostel.name}</h1>

          <div className="card mb-20">
            <div className="card-content">
              <h3>{hostel.name}</h3>
              <p>{hostel.location}</p>
              <p className="price">Semester Price: UGX {hostel.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking for Semester'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
