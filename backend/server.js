import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
app.use(cors({ origin: 'https://house-hive-theta.vercel.app' }));
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/properties', propertyRoutes)

app.use('/uploads', express.static('uploads'));
app.use('/api/bookings', bookingRoutes);

app.use((error, req, res, next) => {
	console.error('Request error:', error.message);
	res.status(500).json({ success: false, error: error.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));