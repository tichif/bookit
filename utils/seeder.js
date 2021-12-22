const mongoose = require('mongoose');

const Room = require('../models/Room');
const rooms = require('../data/rooms.json');

const seedRooms = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://tichif:tichif@bookit.zkgjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );

    await Room.deleteMany({});
    console.log('Rooms deleted !!!');

    await Room.insertMany(rooms);
    console.log('Rooms added !!!');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
