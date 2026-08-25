import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/users/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <main className="page"><form className="form-shell" onSubmit={handleSubmit}>
      <p className="eyebrow">Welcome back</p><h2>Make yourself at home.</h2>
      {error && <p className="form-message">{error}</p>}
      <div className="field"><label>Email address</label><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="field"><label>Password</label><input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <button className="button" type="submit">Log in</button>
      <p className="form-footer">New to HouseHive? <a href="/signup">Create an account</a></p>
    </form></main>
  );
}

export default Login;