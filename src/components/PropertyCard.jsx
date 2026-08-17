import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>₹{property.price} / month</p>
      <p>{property.bedrooms} bed · {property.bathrooms} bath</p>
      <Link to={`/properties/${property.id}`}>View Details</Link>
    </div>
  );
}

export default PropertyCard;