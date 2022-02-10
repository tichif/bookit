import nc from 'next-connect';

import { webhookCheckout } from '../../../controllers/auth';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

// make bodyParser to false for using the raw body

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
