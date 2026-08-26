import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  const imageUrl = property.images?.[0];

  return (
    <article className="property-card">
      <div className="property-image">
        {imageUrl ? <img src={imageUrl} alt={property.title} /> : <span>⌂</span>}
      </div>
      <div className="property-info">
        <p className="eyebrow">HouseHive stay</p>
        <h3><Link to={`/properties/${property.id}`}>{property.title}</Link></h3>
        <p className="property-location">{property.location}</p>
        <p className="price">₹{property.price} <span className="muted">/ month</span></p>
        <div className="property-meta"><span>{property.bedrooms} beds</span><span>{property.bathrooms} baths</span><span>Available now</span></div>
      </div>
    </article>
  );
}

export default PropertyCard;