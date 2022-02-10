import nc from 'next-connect';

import { getAllBookingsForUser } from '../../../controllers/booking';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).get(getAllBookingsForUser);

export default handler;
