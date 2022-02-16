import nc from 'next-connect';

import { getAllRoomsForAdmin } from '../../../../controllers/rooms';
import connectDB from '../../../../config/db';
import { isAuthenticatedUser, authorize } from '../../../../middlewares/auth';
import errorResponse from '../../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.use(isAuthenticatedUser, authorize('admin')).get(getAllRoomsForAdmin);

export default handler;
