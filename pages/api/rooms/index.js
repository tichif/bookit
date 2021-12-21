import nc from 'next-connect';

import { getAllRooms } from '../../../controllers/rooms';
import connectDB from '../../../config/db';

connectDB();

const handler = nc();

handler.get(getAllRooms);

export default handler;
