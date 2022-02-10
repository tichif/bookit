import axios from 'axios';

import {
  CHECK_BOOKING_FAILED,
  CHECK_BOOKING_LOADING,
  CHECK_BOOKING_SUCCESS,
  CLEAR_ERROR,
} from '../constants/booking';

// check booking availability
export const checkBookingAvailability =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_LOADING });

      const { data } = await axios.get(
        `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      );

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Erreur',
      });
    }
  };

// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
