import Booking from '../models/Booking';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';

// @path    POST /api/bookings
// @desc    Book a room
// @access  Private
export const createBooking = asyncHandler(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    dayOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    dayOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  });

  return res.status(201).json({
    success: true,
    booking,
  });
});
