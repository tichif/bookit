import Room from '../models/Room';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';

// @path    GET /api/rooms
// @desc    Get all rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const resultsPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new ApiFeatures(Room.find(), req.query).search().filter();

  apiFeatures.paginate(resultsPerPage);
  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  res.status(200).json({
    success: true,
    roomsCount,
    resultsPerPage,
    filteredRoomsCount,
    rooms,
  });
});

// @path    POST /api/rooms
// @desc    Create a room
// @access  Private
const createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    room,
  });
});

// @path    GET /api/rooms/:id
// @desc    Get a specific room
// @access  Public
const getRomById = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

// @path    PUT /api/rooms/:id
// @desc    Update a specific room
// @access  Private
const updateRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }

  const updatedRoom = await Room.findByIdAndUpdate(room._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    updatedRoom,
  });
});

// @path    DELETE /api/rooms/:id
// @desc    Delete a specific room
// @access  Private
const deleteRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: 'Room deleted',
  });
});

// @path    PUT /api/reviews
// @desc    Create a new review for a room
// @access  Private
const createReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId); // req.params.id in express ; req.query.id in next

  if (!room) {
    return next(new ErrorHandler('Room not found', 404));
  }

  const isReviewed = room.reviews.find(
    (room) => room.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = Number(rating);
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
  });
});

export {
  getAllRooms,
  createRoom,
  getRomById,
  updateRoom,
  deleteRoom,
  createReview,
};
