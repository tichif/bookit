import nc from 'next-connect';

import { createReview } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).put(createReview);

export default handler;
