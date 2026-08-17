import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

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

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingSuccess('');

    try {
      await axiosInstance.post('/bookings', {
        property_id: id,
        start_date: startDate,
        end_date: endDate
      });
      setBookingSuccess('Booking confirmed!');
    } catch (err) {
      setBookingError(err.response?.data?.error || 'Booking failed');
    }
  };

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

      <h3>Book this property</h3>
      {user ? (
        <form onSubmit={handleBooking}>
          {bookingError && <p style={{ color: 'red' }}>{bookingError}</p>}
          {bookingSuccess && <p style={{ color: 'green' }}>{bookingSuccess}</p>}
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          <button type="submit">Book Now</button>
        </form>
      ) : (
        <p>Please log in to book this property.</p>
      )}
    </div>
  );
}

export default PropertyDetails;