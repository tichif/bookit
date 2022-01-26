import nc from 'next-connect';

import { createBooking } from '../../../controllers/booking';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.post(createBooking);

export default handler;
