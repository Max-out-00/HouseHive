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
      } catch {
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

  if (loading) return <main className="page"><p className="eyebrow">HouseHive homes</p><h1>Loading your stay...</h1></main>;
  if (error) return <main className="page"><div className="empty"><h2>Something went wrong.</h2><p>{error}</p></div></main>;
  if (!property) return <main className="page"><div className="empty"><h2>Property not found.</h2></div></main>;

  const imageUrl = property.images?.[0];

  return (
    <main className="page"><div className="detail-layout"><section><div className="detail-image">{imageUrl ? <img src={imageUrl} alt={property.title} /> : '⌂'}</div><div className="detail-copy"><p className="eyebrow">A place to belong</p><h1>{property.title}</h1><p className="property-location">{property.location}</p><div className="detail-stats"><span><strong>{property.bedrooms}</strong> bedrooms</span><span><strong>{property.bathrooms}</strong> bathrooms</span><span><strong>₹{property.price}</strong> monthly</span></div><p className="detail-description">{property.description}</p></div></section><aside className="booking-card"><p className="eyebrow">Make it yours</p><h2>Book this home</h2><p className="price">₹{property.price} <span className="muted">/ month</span></p>
      {user ? (
        <form onSubmit={handleBooking}>
          {bookingError && <p className="form-message">{bookingError}</p>}{bookingSuccess && <p className="success">{bookingSuccess}</p>}
          <div className="field"><label>Move-in date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></div><div className="field"><label>Move-out date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></div><button className="button" type="submit">Request to book</button>
        </form>
      ) : (
        <p className="muted">Please log in to book this property.</p>)}
      </aside></div></main>
  );
}

export default PropertyDetails;