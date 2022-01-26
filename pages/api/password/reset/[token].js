import nc from 'next-connect';

import { resetPassword } from '../../../../controllers/auth';
import connectDB from '../../../../config/db';
import errorResponse from '../../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.post(resetPassword);

export default handler;
