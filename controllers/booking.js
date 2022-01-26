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

// @path    GET /api/bookings/check
// @desc    Check room availability
// @access  Public
export const checkBookingAvailability = asyncHandler(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = newDate(checkInDate);
  checkOutDate = newDate(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  return res.status(201).json({
    success: true,
    isAvailable,
  });
});
