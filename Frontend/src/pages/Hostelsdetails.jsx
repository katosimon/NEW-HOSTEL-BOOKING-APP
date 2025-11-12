import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/hostels/${id}`)
      .then(response => setHostel(response.data))
      .catch(error => console.error('Error fetching hostel:', error))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = () => {
    if (!user) navigate('/login');
    else navigate(`/booking/${id}`);
  };

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!hostel) return <div className="container text-center"><h2>Hostel not found</h2></div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-image" style={{ height: '400px' }}>
          {hostel.images?.[0] ? (
            <img src={hostel.images[0]} alt={hostel.name} />
          ) : (
            <div className="flex-center" style={{ height: '100%' }}>No Image Available</div>
          )}
        </div>
        
        <div className="card-content">
          <div className="flex-between mb-20">
            <div>
              <h1>{hostel.name}</h1>
              <p className="card-text">{hostel.location}</p>
            </div>
            <div>
              <span className="badge badge-success">{hostel.type}</span>
              <div className="mt-10">
                <span className="price">${hostel.price}/month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-3 mb-20">
            <div className="card">
              <div className="card-content text-center">
                <h3>Monthly Rent</h3>
                <p className="price">${hostel.price}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content text-center">
                <h3>Rooms Available</h3>
                <p className="price">{hostel.roomsAvailable}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-content text-center">
                <h3>Total Rooms</h3>
                <p className="price">{hostel.totalRooms}</p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2>Description</h2>
            <p className="card-text">{hostel.description}</p>
          </div>

          {hostel.amenities?.length > 0 && (
            <div className="mb-20">
              <h2>Amenities</h2>
              <div className="grid grid-4">
                {hostel.amenities.map((amenity, index) => (
                  <div key={index} className="card">
                    <div className="card-content text-center">
                      <p>{amenity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-between">
            <Link to="/hostels" className="btn btn-secondary">← Back to Hostels</Link>
            <button onClick={handleBookNow} className="btn btn-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;


