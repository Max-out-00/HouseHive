import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateListing from './pages/CreateListing';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// inside <Routes>

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>}/>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;