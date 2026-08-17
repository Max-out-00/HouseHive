import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setProperty(res.data.property);
      } catch (err) {
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.location}</p>
      <p>₹{property.price} / month</p>
      <p>{property.bedrooms} bed · {property.bathrooms} bath</p>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetails;