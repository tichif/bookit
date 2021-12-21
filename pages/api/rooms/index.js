import nc from 'next-connect';

import { getAllRooms, createRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';

connectDB();

const handler = nc();

handler.get(getAllRooms);

handler.post(createRoom);

export default handler;
