import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createBooking, getBookingsByRenter, getBookingsByProperty, getBookingsForHost, updateBookingStatus } from '../controllers/bookingController.js';


const router = express.Router();

router.get('/host', verifyToken, getBookingsForHost);
router.patch('/:id/status', verifyToken, updateBookingStatus);
router.get('/renter/:renterId', getBookingsByRenter);
router.get('/property/:propertyId', getBookingsByProperty);
router.post('/', verifyToken, createBooking);


export default router;