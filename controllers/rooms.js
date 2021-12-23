import Room from '../models/Room';
import ErrorHandler from '../utils/errorHandler';

// @path    GET /api/rooms
// @desc    Get all rooms
// @access  Public
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @path    POST /api/rooms
// @desc    Create a room
// @access  Private
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @path    GET /api/rooms/:id
// @desc    Get a specific room
// @access  Public
const getRomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

    if (!room) {
      return next(new ErrorHandler('Room not found', 404));
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @path    PUT /api/rooms/:id
// @desc    Update a specific room
// @access  Private
const updateRoom = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @path    DELETE /api/rooms/:id
// @desc    Delete a specific room
// @access  Private
const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

    if (!room) {
      return next(new ErrorHandler('Room not found', 404));
    }

    await room.remove();

    res.status(200).json({
      success: true,
      message: 'Room deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { getAllRooms, createRoom, getRomById, updateRoom, deleteRoom };
