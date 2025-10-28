import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import hostel1 from '../assets/hostel1.jpg';
import hostel2 from '../assets/hostel2.jpg';
import hostel3 from '../assets/hostel3.jpg';
import hostel4 from '../assets/hostel4.jpg';
import hostel5 from '../assets/hostel5.jpg';
import hostel6 from '../assets/hostel6.jpg';



const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '' });
  const [searchParams] = useSearchParams();

  /* -------  TWO MOCK HOSTELS  ------- */
  const MOCK_HOSTELS = [
    {
      _id: 'demo-1',
      name: 'Urban Oasis Hostel',
      type: 'mixed',
      location: 'Downtown Metro',
      description:
        'A modern, eco-friendly hostel in the city centre with co-working spaces and a rooftop café.',
      price: 450,
      rating: '4.7',
      images: [hostel1],
    },
    {
      _id: 'demo-2',
      name: 'Mountain View Retreat',
      type: 'female',
      location: 'Hill-side Campus',
      description:
        'Quiet hillside hostel offering panoramic views, perfect for focused study and weekend hikes.',
      price: 380,
      rating: '4.5',
      images: [hostel2],
    },
     {
      _id: 'demo-2',
      name: 'Mountain View Retreat',
      type: 'mixed',
      location: 'Hill-side Campus',
      description:
        'Quiet hillside hostel offering panoramic views, perfect for focused study and weekend hikes.',
      price: 380,
      rating: '4.5',
      images: [hostel3],
    },
     {
      _id: 'demo-2',
      name: 'Mountain View Retreat',
      type: 'mixed',
      location: 'Hill-side Campus',
      description:
        'Quiet hillside hostel offering panoramic views, perfect for focused study and weekend hikes.',
      price: 380,
      rating: '4.5',
      images: [hostel4],
    },
     {
      _id: 'demo-2',
      name: 'Mountain View Retreat',
      type: 'female',
      location: 'Hill-side Campus',
      description:
        'Quiet hillside hostel offering panoramic views, perfect for focused study and weekend hikes.',
      price: 380,
      rating: '4.5',
      images: [hostel5],
    },
     {
      _id: 'demo-2',
      name: 'Mountain View Retreat',
      type: 'mixed',
      location: 'Hill-side Campus',
      description:
        'Quiet hillside hostel offering panoramic views, perfect for focused study and weekend hikes.',
      price: 380,
      rating: '4.5',
      images: [hostel6],
    }
  ];
  /* ---------------------------------- */

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get(`/api/hostels`);
        const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : [];

        const searchTerm = searchParams.get('search')?.toLowerCase() || '';
        const typeFilter = filters.type;

        const filtered = (data.length ? data : MOCK_HOSTELS).filter((h) => {
          const matchesSearch =
            !searchTerm ||
            h.name.toLowerCase().includes(searchTerm) ||
            h.location.toLowerCase().includes(searchTerm) ||
            h.description.toLowerCase().includes(searchTerm);
          const matchesType = !typeFilter || h.type === typeFilter;
          return matchesSearch && matchesType;
        });

        setHostels(filtered);
      } catch (err) {
        console.error(err);
        setHostels(MOCK_HOSTELS); // fallback on error
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
      <h1 className="page-title">🏠 Find Your Perfect Hostel</h1>

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
                {hostel.images?.[0] ? (
                  <img src={hostel.images[0]} alt={hostel.name} />
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
                  {hostel.description.length > 120
                    ? `${hostel.description.substring(0, 120)}...`
                    : hostel.description}
                </p>

                <div className="card-footer">
                  <div className="price-rating">
                    <span className="price">${hostel.price}/month</span>
                    <span className="rating">⭐ {hostel.rating}</span>
                  </div>
                  <div className="card-actions">
                    <Link to={`/hostel/${hostel._id}`} className="btn btn-secondary">
                      View Details
                    </Link>
                    <Link to={`/booking/${hostel._id}`} className="btn btn-primary">
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

