import nc from 'next-connect';

import { getRomById, updateRoom, deleteRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';
import { isAuthenticatedUser, authorize } from '../../../middlewares/auth';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(getRomById);

handler.use(isAuthenticatedUser, authorize('admin')).put(updateRoom);

handler.use(isAuthenticatedUser, authorize('admin')).delete(deleteRoom);

export default handler;
