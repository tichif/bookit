import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required.'],
      maxlength: [50, 'You name cannot exceed 50 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'This email already exists.'],
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Email is required.'],
      minlength: [8, 'You name must be than 8 characters.'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
