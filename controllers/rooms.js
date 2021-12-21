import Room from '../models/Room';

// @path    /api/rooms
// @desc    Get all rooms
// @access  Public
const getAllRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all rooms',
  });
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

export { getAllRooms, createRoom };
