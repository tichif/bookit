import nc from 'next-connect';

import { updateUserProfile } from '../../../controllers/auth';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).put(updateUserProfile);

export default handler;
