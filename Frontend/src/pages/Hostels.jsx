import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import hostel1 from '../assets/hostel1.jpg';
import hostel2 from '../assets/hostel2.jpg';
import hostel3 from '../assets/hostel3.jpg';
import hostel4 from '../assets/hostel4.jpg';
import hostel5 from '../assets/hostel5.jpg';
import hostel6 from '../assets/hostel6.jpg';

const hostelImages = [hostel1, hostel2, hostel3, hostel4, hostel5, hostel6];
const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '' });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get('https://new-hostel-booking-app.onrender.com/api/hostels'); // Fetch all hostels
        let data = Array.isArray(res.data) ? res.data : res.data.data || [];

        const searchTerm = searchParams.get('search')?.toLowerCase() || '';
        const typeFilter = filters.type;

        const filtered = data.filter((h) => {
          const matchesSearch =
            !searchTerm ||
            h.name.toLowerCase().includes(searchTerm) ||
            h.location.toLowerCase().includes(searchTerm) ||
            (h.description && h.description.toLowerCase().includes(searchTerm));
          const matchesType = !typeFilter || h.type === typeFilter;
          return matchesSearch && matchesType;
        });

        setHostels(filtered);
      } catch (err) {
        console.error('Error fetching hostels:', err);
        setHostels([]); // fallback empty array
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, [searchParams, filters]);

  if (loading)
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    );

  return (
    <div className="container">
      <h1 className="page-title">🏠🪴 Find Your Perfect Hostel</h1>

      <div className="filter-card">
        <div className="filters">
          <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      {hostels.length === 0 ? (
        <div className="no-results">
          {searchParams.get('search')
            ? `No hostel found for "${searchParams.get('search')}".`
            : 'No hostels found matching your criteria.'}
        </div>
      ) : (
        <div className="hostel-grid">
          {hostels.map((hostel) => (
            <div key={hostel._id} className="hostel-card">
              <div className="image-wrapper">
                {hostelImages?.[0] ? (
                  <img src={hostelImages[2]} alt={hostel.name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="card-body">
                <div className="card-header">
                  <h3>{hostel.name}</h3>
                  <span className={`badge ${hostel.type}`}>{hostel.type}</span>
                </div>

                <p className="location">📍 {hostel.location}</p>

                <p className="description">
                  {hostel.description && hostel.description.length > 120
                    ? `${hostel.description.substring(0, 120)}...`
                    : hostel.description}
                </p>

                <div className="card-footer">
                  <div className="price-rating">
                    <span className="price">UGX{hostel.price}</span>
                    <span className="rating">⭐ {hostel.rating || 'N/A'}</span>
                  </div>
                  <div className="card-actions">
                    <Link to={`/hostel/${hostel._id}`} className="details-btn">
                      View Details
                    </Link>
                    <Link to={`/booking/${hostel._id}`} className="book-btn">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hostels;

