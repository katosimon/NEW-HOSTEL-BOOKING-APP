import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '' });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        
        const response = await axios.get(`/api/hostels`);
        const data = response.data;

        const parsedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        let finalHostels = [];
        if (parsedData.length === 0) {
          const hostelDescriptions = [
            "Urban Oasis Hostel offers a perfect blend of modern amenities and a cozy atmosphere. Located in the heart of the city, it provides easy access to public transportation, shopping centers, and restaurants.",
            "Mountain View Retreat is nestled in the serene hills, offering breathtaking views and a peaceful environment. Perfect for students who prefer quiet study spaces.",
            "The Scholar's Haven is designed specifically for academic excellence. With dedicated study rooms, 24/7 library access, and quiet zones.",
            "City Lights Hostel boasts a vibrant community atmosphere with regular social events, game nights, and cultural exchanges. Located in the bustling downtown area.",
            "Green Living Residence is an eco-friendly hostel with solar panels, rainwater harvesting, and an organic garden. Residents participate in sustainability workshops.",
            "Tech Hub Hostel is equipped with high-speed internet, computer labs, and tech workshops. Perfect for tech-savvy students with innovation labs.",
            "Heritage House combines historic charm with modern comforts. Housed in a beautifully restored building, it features unique architectural details.",
            "Active Lifestyle Hostel includes a gym, yoga studio, and sports facilities. Regular fitness classes and outdoor adventure trips are organized.",
            "Artistic Soul Hostel is a creative space with art studios, music rooms, and exhibition areas. Regular art workshops and open mic nights.",
            "International Friendship Hostel brings together students from around the world. Cultural exchange programs and international cuisine nights.",
            "Quiet Zone Residence offers a peaceful environment with strict noise policies, soundproof rooms, and tranquil gardens.",
            "Budget Bliss Hostel provides affordable accommodation without compromising on quality. Shared spaces and communal kitchens.",
            "Luxury Living Hostel offers premium amenities including a swimming pool, spa, and concierge services. Spacious rooms with en-suite bathrooms.",
            "Entrepreneur's Hub is designed for business-minded students with co-working spaces, networking events, and mentorship programs.",
            "Nature's Nest Hostel is surrounded by lush greenery with hiking trails and outdoor seating areas. Regular nature walks are organized.",
            "Fitness First Hostel includes a state-of-the-art gym, personal training sessions, and nutrition counseling. Residents enjoy fitness challenges.",
            "Cultural Crossroads Hostel celebrates diversity with themed rooms representing different cultures and international film screenings.",
            "Study Sanctuary provides the perfect academic environment with individual study pods, research facilities, and academic support services.",
            "Social Butterfly Hostel is designed for extroverts with common areas, game rooms, and regular social events. Themed parties and group outings.",
            "Zen Retreat offers a peaceful environment with meditation rooms, yoga spaces, and mindfulness workshops. Residents enjoy quiet contemplation.",
            "Foodie's Paradise Hostel features a communal kitchen with cooking classes, food tasting events, and visits to local markets.",
            "Music Makers Hostel includes soundproof practice rooms, a recording studio, and performance spaces. Regular jam sessions and music workshops.",
            "Bookworm's Haven is a reader's paradise with an extensive library, reading nooks, and book clubs. Regular author visits and literary discussions.",
            "Adventure Seekers Hostel organizes outdoor activities, adventure trips, and extreme sports experiences. Residents enjoy rock climbing and rafting.",
            "Digital Nomad's Hub is equipped with co-working spaces, high-speed internet, and tech support. Regular skill-sharing sessions and workshops.",
            "Wellness Warrior Hostel focuses on holistic well-being with fitness classes, nutrition counseling, and mental health support.",
            "Science & Innovation Hostel includes labs, research facilities, and innovation spaces. Regular science fairs and experiment workshops.",
            "Community Builder Hostel emphasizes social responsibility with volunteer programs and community service projects.",
            "Creative Minds Hostel is a hub for innovation with maker spaces, design studios, and brainstorming areas. Regular hackathons and design workshops.",
            "Global Explorer Hostel organizes cultural trips, language immersion programs, and international exchanges."
          ];

          const mockData = Array.from({ length: 30 }, (_, i) => ({
            _id: `mock-${i}`,
            name: `${hostelDescriptions[i].split(' ')[0]} Hostel`,
            type: ['male', 'female', 'mixed'][i % 3],
            location: `Location ${i + 1}`,
            description: hostelDescriptions[i],
            price: 300 + (i % 5) * 50,
            rating: (3 + (i % 3) + Math.random()).toFixed(1),
            images: [`https://source.unsplash.com/random/400x300?hostel&sig=${i}`], 
          }));
          finalHostels = mockData;
        } else {
          finalHostels = parsedData;
        }

        const searchTerm = searchParams.get('search')?.toLowerCase() || '';
        const typeFilter = filters.type;

        const filteredHostels = finalHostels.filter(hostel => {
          const matchesSearch = !searchTerm || 
            hostel.name.toLowerCase().includes(searchTerm) ||
            hostel.location.toLowerCase().includes(searchTerm) ||
            hostel.description.toLowerCase().includes(searchTerm);

          const matchesType = !typeFilter || hostel.type === typeFilter;

          return matchesSearch && matchesType;
        });

        setHostels(filteredHostels);

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
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      {hostels.length === 0 ? (
        <div className="no-results">
          {searchParams.get('search') ? `No hostel found for "${searchParams.get('search')}".` : 'No hostels found matching your criteria.'}
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
                    <Link to={`/hostel/${hostel._id}`} className="details-btn">
                      View Details
                    </Link>
                    <Link to={`/book/${hostel._id}`} className="book-btn">
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
