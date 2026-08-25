import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Step 1: create the property
      const res = await axiosInstance.post('/properties', {
        title, description, price, location, bedrooms, bathrooms
      });

      const propertyId = res.data.property.id;

      // Step 2: upload images, if any were selected
      if (images.length > 0) {
        const formData = new FormData();
        for (const file of images) {
          formData.append('images', file);
        }

        await axiosInstance.post(`/properties/${propertyId}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate(`/properties/${propertyId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create listing');
    }
  };

  return (
    <main className="page"><form className="form-shell" onSubmit={handleSubmit}>
      <p className="eyebrow">Share your space</p><h2>Create a listing.</h2><p className="muted">Tell future residents what makes this place special.</p>
      {error && <p className="form-message">{error}</p>}
      <div className="form-grid"><div className="field full"><label>Listing title</label><input type="text" placeholder="A bright home in the heart of..." value={title} onChange={(e) => setTitle(e.target.value)} required /></div><div className="field full"><label>Description</label><textarea placeholder="What will people love about living here?" value={description} onChange={(e) => setDescription(e.target.value)} required /></div><div className="field"><label>Monthly price</label><input type="number" placeholder="₹ 25,000" value={price} onChange={(e) => setPrice(e.target.value)} required /></div><div className="field"><label>Location</label><input type="text" placeholder="City, neighbourhood" value={location} onChange={(e) => setLocation(e.target.value)} required /></div><div className="field"><label>Bedrooms</label><input type="number" placeholder="2" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required /></div><div className="field"><label>Bathrooms</label><input type="number" placeholder="1" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required /></div></div>
      <div className="field"><label>Photos</label><div className="upload-box"><span>Choose a few photos of your home</span><input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} /></div></div>
      <button className="button" type="submit">Publish listing</button>
    </form></main>
  );
}

export default CreateListing;