import nc from 'next-connect';

import { getAllRooms, createRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';
import errorResponse from '../../../middlewares/error';

connectDB();

const handler = nc({ onError: errorResponse });

handler.get(getAllRooms);

handler.post(createRoom);

export default handler;
