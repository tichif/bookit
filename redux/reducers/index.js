import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './rooms';

import { userRegisterReducer } from './users';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  userRegister: userRegisterReducer,
});

export default reducer;
