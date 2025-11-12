import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema(
  {
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hostelBooked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hostel',
    },
  },
  { timestamps: true }
);

 export default mongoose.model('bookings',bookingSchema);
