import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/users/register', { name, email, phone, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <main className="page"><form className="form-shell" onSubmit={handleSubmit}>
      <p className="eyebrow">Start your next chapter</p><h2>There’s room for you here.</h2>
      {error && <p className="form-message">{error}</p>}
      <div className="field"><label>Your name</label><input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
      <div className="field"><label>Email address</label><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="field"><label>Phone number</label><input type="tel" placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
      <div className="field"><label>Create a password</label><input type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <button className="button" type="submit">Create my account</button>
      <p className="form-footer">Already have an account? <a href="/login">Log in</a></p>
    </form></main>
  );
}

export default Signup;