import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './rooms';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
});

export default reducer;
