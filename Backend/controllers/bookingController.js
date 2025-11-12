import Booking from '../models/Booking.js';

export const getBookings = async (req, res, next) => {
  try {
    const userId = req.user; 

    const userBookings = await Booking.find({ booker: userId })
      .populate('booker', 'name email') 
      .populate('hostelBooked', 'name location'); 

    if (!userBookings || userBookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No bookings found for this user',
      });
    }

    const { name, email } = userBookings[0].booker;

    res.status(200).json({
      success: true,
      user: { name, email },
      data: userBookings,
    });

    console.log("Token user ID:", userId);
    console.log("Bookings found:", userBookings.length);

  } catch (error) {
    console.error('Error fetching bookings:', error);
    next(error);
  }
};


export const addBooking = async (req, res, next) => {
  try {
    const bookerId = req.user; 
    const { hostelId } = req.body;

    if (!bookerId || !hostelId) {
      return res
        .status(400)
        .json({ message: 'User ID and Hostel ID are required.' });
    }

    const newBooking = await Booking.create({
      booker: bookerId,
      hostelBooked: hostelId,
    });

    res.status(201).json({
      success: true,
      data: newBooking,
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const userId = req.user; 
    const { id: bookingId } = req.params; 

    
    const bookingToDelete = await Booking.findById(bookingId);

    if (!bookingToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (bookingToDelete.booker.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this booking',
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      message: 'Booking successfully deleted',
      data: null,
    });

    console.log(`Booking ID ${bookingId} deleted by user ${userId}`);

  } catch (error) {
    console.error('Error deleting booking:', error);
    next(error); 
  }
};
