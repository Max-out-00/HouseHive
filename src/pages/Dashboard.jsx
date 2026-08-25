import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hostBookings, setHostBookings] = useState([]);

  useEffect(() => {
    const fetchHostBookings = async () => {
      try {
        const res = await axiosInstance.get('/bookings/host');
        setHostBookings(res.data.bookings);
      } catch (err) {
        // silently ignore if user has no properties, or handle as needed
      }
    };
    fetchHostBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await axiosInstance.patch(`/bookings/${bookingId}/status`, { status });
      setHostBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/renter/${user.id}`);
        setBookings(res.data.bookings);
      } catch {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  return (
    <main className="page">
      <div className="dashboard-head">
        <div>
          <p className="eyebrow">Your HouseHive</p>
          <h1>Hello, {user.name}.</h1>
          <p className="muted">Keep track of the places you're headed.</p>
        </div>
        <button className="button ghost" onClick={logout}>Log out</button>
      </div>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your stays</p>
            <h2>Upcoming bookings</h2>
          </div>
        </div>
        {loading && <p className="muted">Loading your stays...</p>}
        {error && <p className="form-message">{error}</p>}
        {!loading && bookings.length === 0 && (
          <div className="empty">
            <h2>No bookings yet.</h2>
            <p className="muted">Your next chapter is waiting to be found.</p>
          </div>
        )}
        <div className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-row" key={booking.id}>
              <div>
                <h3>{booking.title}</h3>
                <p>{booking.location}</p>
              </div>
              <time>{booking.start_date}</time>
              <time>{booking.end_date}</time>
              <span className="status">{booking.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">As a host</p>
            <h2>Booking requests on your properties</h2>
          </div>
        </div>
        {hostBookings.length === 0 && (
          <div className="empty">
            <h2>No requests yet.</h2>
            <p className="muted">Booking requests on your listings will show up here.</p>
          </div>
        )}
        <div className="booking-list">
          {hostBookings.map((booking) => (
            <article className="booking-row" key={booking.id}>
              <div>
                <h3>{booking.title}</h3>
              </div>
              <time>{booking.start_date}</time>
              <time>{booking.end_date}</time>
              <span className="status">{booking.status}</span>
              {booking.status === 'pending' && (
                <div className="booking-actions">
                  <button className="button" onClick={() => handleStatusUpdate(booking.id, 'confirmed')}>Approve</button>
                  <button className="button ghost" onClick={() => handleStatusUpdate(booking.id, 'cancelled')}>Reject</button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;