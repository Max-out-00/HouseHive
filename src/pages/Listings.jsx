import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PropertyCard from '../components/PropertyCard';

function Listings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosInstance.get('/properties');
        setProperties(res.data.properties);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Listings</h1>
      <div className="listings-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default Listings;