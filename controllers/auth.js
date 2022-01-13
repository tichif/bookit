import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url';

import User from '../models/User';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';
import sendEmail from '../utils/sendEmail';

// Setting the cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @path    POST /api/auth/register
// @desc    Register user
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    width: '150',
    crop: 'scale',
  });

  await User.create({
    name,
    email,
    password,
    avatar: { public_id: result.public_id, url: result.secure_url },
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully !!!',
  });
});

// @path    GET /api/me
// @desc    Current user profile
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  return res.status(200).json({
    success: true,
    user,
  });
});

// @path    PUT /api/me/update
// @desc    Update user's profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password || user.password;
  }

  // update avatar
  if (req.body.avatar !== '') {
    const image_id = user.avatar.public_id;
    // Delete previous user's avatar
    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale',
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  return res.status(200).json({
    success: true,
  });
});

// @path    PUT /api/password/forgot
// @desc    Send password recovery email
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('Email incorrect', 404));
  }

  // Get reset Token
  const token = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${absoluteUrl(req).origin}/password/reset/${resetToken}`;

  const message = `
  <div>
    <h2>Reset Password</h2>
    <p>You or someone else requested a reset password.If it isn't you, please forget this message.</p>
    <p>Please <a href=${resetUrl}>Click here</a> to reset your password.</p>
  </div>
`;

  const options = {
    email: user.email,
    subject: 'Reset Password',
    message,
  };

  try {
    await sendEmail(options);
    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler('Server Error', 500));
  }
});
