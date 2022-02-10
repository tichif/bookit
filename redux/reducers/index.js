import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer } from './rooms';

import {
  userRegisterReducer,
  userLoadReducer,
  userUpdateReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './users';

import { checkBookingsReducer } from './booking';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  userRegister: userRegisterReducer,
  userLoad: userLoadReducer,
  userUpdate: userUpdateReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  checkBooking: checkBookingsReducer,
});

export default reducer;
