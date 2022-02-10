import nc from 'next-connect';

import { stripeCheckoutSession } from '../../../controllers/payment';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;
