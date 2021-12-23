import nc from 'next-connect';

import { getRomById } from '../../../controllers/rooms';
import connectDB from '../../../config/db';

connectDB();

const handler = nc();

handler.get(getRomById);

export default handler;
