import nc from 'next-connect';

import { getAllRooms } from '../../../controllers/rooms';

const handler = nc();

handler.get(getAllRooms);

export default handler;
