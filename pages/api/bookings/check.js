import nc from 'next-connect';

import { checkBookingAvailability } from '../../../controllers/booking';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(checkBookingAvailability);

export default handler;
