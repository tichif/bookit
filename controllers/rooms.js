const getAllRooms = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all rooms',
  });
};

export { getAllRooms };
