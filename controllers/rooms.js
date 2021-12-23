import Room from '../models/Room';

// @path    /api/rooms
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

// @path    /api/rooms
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

// @path    /api/rooms/:id
// @desc    Get a specific room
// @access  Public
const getRomById = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id); // req.params.id in express ; req.query.id in next

    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found',
      });
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

export { getAllRooms, createRoom, getRomById };
