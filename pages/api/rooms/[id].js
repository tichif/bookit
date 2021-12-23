import nc from 'next-connect';

import { getRomById, updateRoom } from '../../../controllers/rooms';
import connectDB from '../../../config/db';

connectDB();

const handler = nc();

handler.get(getRomById);

handler.put(updateRoom);

export default handler;
