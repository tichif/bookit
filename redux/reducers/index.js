import { combineReducers } from 'redux';

import {
  allRoomsReducer,
  roomDetailsReducer,
  createReviewReducer,
  reviewAvailabilityReducer,
} from './rooms';

import {
  userRegisterReducer,
  userLoadReducer,
  userUpdateReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './users';

import {
  checkBookingsReducer,
  bookedDatesReducer,
  myBookingsReducer,
  bookingDetailsReducer,
} from './booking';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetail: roomDetailsReducer,
  userRegister: userRegisterReducer,
  userLoad: userLoadReducer,
  userUpdate: userUpdateReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  checkBooking: checkBookingsReducer,
  bookedDates: bookedDatesReducer,
  myBookings: myBookingsReducer,
  bookingDetails: bookingDetailsReducer,
  createReview: createReviewReducer,
  reviewAvailability: reviewAvailabilityReducer,
});

export default reducer;
