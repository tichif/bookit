import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './rooms';

import {
  userRegisterReducer,
  userLoadReducer,
  userUpdateReducer,
  userForgotPasswordReducer,
} from './users';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  userRegister: userRegisterReducer,
  userLoad: userLoadReducer,
  userUpdate: userUpdateReducer,
  userForgotPassword: userForgotPasswordReducer,
});

export default reducer;
