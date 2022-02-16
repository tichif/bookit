import nc from 'next-connect';

import { checkReviewAvailability } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler;
