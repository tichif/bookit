const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter room's name"],
      trim: true,
      maxlength: [100, "Room's name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter room's price"],
      maxlength: [4, "Room's name cannot exceed 4 characters"],
      default: 0.0,
    },
    address: {
      type: String,
      required: [true, "Please enter room's address"],
      trim: true,
    },
    guestCapacity: {
      type: Number,
      required: [true, "Please enter room's guest capacity"],
    },
    numOfBeds: {
      type: Number,
      required: [true, 'Please enter number of beds in room'],
    },
    internet: {
      type: Boolean,
      default: false,
    },
    breakfast: {
      type: Boolean,
      default: false,
    },
    airConditioned: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    roomCleaning: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter room's category"],
      enum: {
        values: ['King', 'Single', 'Twins'],
        message: 'Please select correct category for room',
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          // required: true,
        },
        name: {
          type: String,
          // required: true,
        },
        rating: {
          type: Number,
          // required: true,
        },
        comment: {
          type: String,
          // required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);
