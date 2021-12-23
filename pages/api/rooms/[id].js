import nc from 'next-connect';

import { getRomById, updateRoom, deleteRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';

connectDB();

const handler = nc();

handler.get(getRomById);

handler.put(updateRoom);

handler.delete(deleteRoom);

export default handler;
