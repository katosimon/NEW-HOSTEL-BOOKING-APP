import  hostelRoute from './Routes/hostelRoute.js'
import bookingRoute from './Routes/bookingRoute.js'
import userRoute from './Routes/userRoute.js'
import express from 'express';
import { DbConnect } from './Routes/db.js';
import cors from 'cors';
export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users',userRoute);
app.use('/api/hostels',hostelRoute);
app.use('/api/bookings',bookingRoute)

DbConnect();
const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`example is on port ${PORT}`);
});

