import express from 'express';
import { getHostels, addHostel } from '../controllers/hostelController.js';
const router = express.Router();

router.get('/:id', getHostels).post('/', addHostel);

export default router;
