import {
  CHECK_BOOKING_FAILED,
  CHECK_BOOKING_LOADING,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERROR,
} from '../constants/booking';

// check bookings reducers
export const checkBookingsReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_BOOKING_LOADING:
      return {
        loading: true,
      };
    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };
    case CHECK_BOOKING_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CHECK_BOOKING_RESET:
      return {
        loading: null,
        available: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
