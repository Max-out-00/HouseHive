import express from 'express';
import { createBooking, getBookingsByRenter, getBookingsByProperty } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/renter/:renterId', getBookingsByRenter);
router.get('/property/:propertyId', getBookingsByProperty);
router.post('/', verifyToken, createBooking);


export default router;