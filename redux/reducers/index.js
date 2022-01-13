import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './rooms';

import {
  userRegisterReducer,
  userLoadReducer,
  userUpdateReducer,
} from './users';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  userRegister: userRegisterReducer,
  userLoad: userLoadReducer,
  userUpdate: userUpdateReducer,
});

export default reducer;
