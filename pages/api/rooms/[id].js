import nc from 'next-connect';

import { getRomById, updateRoom, deleteRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(getRomById);

handler.put(updateRoom);

handler.delete(deleteRoom);

export default handler;
