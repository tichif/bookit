import nc from 'next-connect';

import { getAllBookingDates } from '../../../controllers/booking';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(getAllBookingDates);

export default handler;
