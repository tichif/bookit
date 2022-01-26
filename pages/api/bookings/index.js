import nc from 'next-connect';

import { createBooking } from '../../../controllers/booking';
import connectDB from '../../../config/db';
import { isAuthenticatedUser } from '../../../middlewares/auth';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).post(createBooking);

export default handler;
