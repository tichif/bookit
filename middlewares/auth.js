import { getSession } from 'next-auth/react';

import asyncHandler from './asyncHandler';
import ErrorHandler from '../utils/errorHandler';

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler('Unauthorized !!!', 401));
  }

  req.user = session.user;
  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler('Unauthorized !!!', 403));
    }
    next();
  };
};
