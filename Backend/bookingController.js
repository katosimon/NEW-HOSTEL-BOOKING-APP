import Booking from '../models/Booking.js';
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('booker', ' _id name email')
      .populate('hostelBooked', 'name price');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

export const addBooking = async (req, res) => {
  try {
    const {bookerId}=req.user;
    const { hostelId } = req.body;
    if (!bookerId || !hostelId) {
      return res
        .status(400)
        .json({ message: 'User ID and Hostel ID are required.', bookerId, hostelId });
    }
    const newBooking = await Booking.create({
      booker: bookerId,
      hostelbooked: hostelId,
    });
    res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
  }
};
