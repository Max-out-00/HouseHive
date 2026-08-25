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
      } catch {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <main className="page"><p className="eyebrow">HouseHive homes</p><h1>Finding your next place...</h1></main>;
  if (error) return <main className="page"><div className="empty"><h2>We couldn't load the homes.</h2><p>{error}</p></div></main>;

  return (
    <main className="page">
      <div className="section-heading"><div><p className="eyebrow">The collection</p><h1>Homes worth<br />coming home to.</h1></div><p className="muted">{properties.length} places to explore</p></div>
      {properties.length === 0 ? <div className="empty"><h2>No listings yet.</h2><p>Be the first to share a thoughtful space.</p></div> : <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>}
    </main>
  );
}

export default Listings;