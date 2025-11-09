import express from 'express';
import { addBooking,getBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
const router =express.Router();

router.get('/',getBookings).post('/', protect,addBooking);


export default router;