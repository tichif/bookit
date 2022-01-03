import Room from '../models/Room';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';

// @path    GET /api/rooms
// @desc    Get all rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({});

  res.status(200).json({
    success: true,
    count: rooms.length,
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

export { getAllRooms, createRoom, getRomById, updateRoom, deleteRoom };
