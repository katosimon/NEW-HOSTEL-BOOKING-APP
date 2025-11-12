import express from 'express';
import { addBooking,getBookings,deleteBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
const router =express.Router();

router.get('/',protect,getBookings).post('/', protect,addBooking).delete('/:id',protect,deleteBooking)


export default router;
