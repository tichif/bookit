import nc from 'next-connect';

import { forgotPassword } from '../../../controllers/auth';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.post(forgotPassword);

export default handler;
