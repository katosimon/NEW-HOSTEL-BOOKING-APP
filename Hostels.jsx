import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', minPrice: '', maxPrice: '' });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const params = new URLSearchParams();
        if (searchParams.get('search')) params.append('search', searchParams.get('search'));
        if (filters.type) params.append('type', filters.type);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const response = await axios.get(`/api/hostels?${params}`);
        const data = response.data;

        const parsedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        if (parsedData.length === 0) {
          const mockData = Array.from({ length: 30 }, (_, i) => ({
            _id: `mock-${i}`,
            name: `Hostel ${i + 1}`,
            type: ['male', 'female', 'co-ed'][i % 3],
            location: `Location ${i + 1}`,
            description: `This is a detailed description of Hostel ${i + 1}. It offers comfortable rooms, clean facilities, and friendly staff.`,
            price: 300 + (i % 5) * 50,
            rating: (3 + (i % 3) + Math.random()).toFixed(1),
            images: ['https://source.unsplash.com/random/400x300?hostel=' + i],
          }));
          setHostels(mockData);
        } else {
          setHostels(parsedData);
        }
      } catch (error) {
        console.error('Error fetching hostels:', error);
        setHostels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, [searchParams, filters]);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="container">
      <h1 className="page-title">🏠 Find Your Perfect Hostel</h1>

      <div className="filter-card">
        <div className="filters">
          <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Types</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="co-ed">Co-ed</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      {hostels.length === 0 ? (
        <div className="no-results">No hostels found matching your criteria.</div>
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
                  <Link to={`/hostel/${hostel._id}`} className="more-btn">
                    More...
                  </Link>
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
