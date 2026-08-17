import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/renter/${user.id}`);
        setBookings(res.data.bookings);
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>

      <h2>My Bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && bookings.length === 0 && <p>You have no bookings yet.</p>}

      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.title} — {booking.location} — {booking.start_date} to {booking.end_date} — {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;