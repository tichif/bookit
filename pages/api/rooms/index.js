import nc from 'next-connect';

import { getAllRooms, createRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser, authorize } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(getAllRooms);

handler.use(isAuthenticatedUser, authorize('admin')).post(createRoom);

export default handler;
