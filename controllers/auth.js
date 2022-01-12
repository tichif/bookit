import User from '../models/User';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from '../middlewares/asyncHandler';
import ApiFeatures from '../utils/apiFeatures';

// @path    POST /api/auth/register
// @desc    Register user
// @access  Private
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: 'PUBLIC_ID', url: 'URL' },
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully !!!',
  });
});
