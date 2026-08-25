import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/"><span className="brand-mark">H</span> househive</Link>
        <div className="nav-links">
          <NavLink to="/listings">Explore homes</NavLink>
          {user && <NavLink to="/dashboard">My stays</NavLink>}
        </div>
        <div className="nav-actions">
          {user ? <><Link className="button ghost small" to="/create-listing">List a home</Link><button className="text-button" onClick={logout}>Log out</button></> : <><Link className="text-button" to="/login">Log in</Link><Link className="button small" to="/signup">Join HouseHive</Link></>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;