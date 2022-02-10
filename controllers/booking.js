import Moment from 'moment';
import { extendMoment } from 'moment-range';

import Booking from '../models/Booking';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';

const moment = extendMoment(Moment);

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

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

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

  return res.status(200).json({
    success: true,
    isAvailable,
  });
});

// @path    GET /api/bookings/check_booked_dates
// @desc    Get all dates already booked for a room
// @access  Public
export const getAllBookingDates = asyncHandler(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );

    const dates = Array.from(range.by('day'));

    bookedDates = bookedDates.concat(dates);
  });

  return res.status(200).json({
    success: true,
    bookedDates,
  });
});

// @path    GET /api/bookings/me
// @desc    Get all bookings of current user
// @access  Private
export const getAllBookingsForUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    bookings,
  });
});

// @path    GET /api/bookings/:id
// @desc    Get booking detail
// @access  Private
export const getBookingDetail = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.query.id).populate(
    'user',
    'name email'
  );

  return res.status(201).json({
    success: true,
    booking,
  });
});
