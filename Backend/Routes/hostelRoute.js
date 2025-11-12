import express from 'express';
import {
  getHostels,
  addHostel,
  getHostelById,
} from '../controllers/hostelController.js';
const router = express.Router();

router.get('/', getHostels).post('/', addHostel).get('/:id', getHostelById);

export default router;
