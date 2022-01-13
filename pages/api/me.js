import nc from 'next-connect';

import { getCurrentUser } from '../../controllers/auth';
import connectDB from '../../config/db';
import errorResponse from '../../middlewares/error';
import { isAuthenticatedUser } from '../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).get(getCurrentUser);

export default handler;
