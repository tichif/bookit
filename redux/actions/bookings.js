import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
  CHECK_BOOKING_FAILED,
  CHECK_BOOKING_LOADING,
  CHECK_BOOKING_SUCCESS,
  BOOKED_DATES_FAILED,
  BOOKED_DATES_SUCCESS,
  MY_BOOKINGS_FAILED,
  MY_BOOKINGS_SUCCESS,
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

// check booking availability
export const getBookedDates = (roomId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/bookings/check_booked_dates?roomId=${roomId}`
    );

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    });
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Erreur',
    });
  }
};

// get all my bookings
export const getMyBookings = (authCookie, req) => async (dispatch) => {
  try {
    const config = {
      headers: {
        cookie: authCookie,
      },
    };

    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/bookings/me`, config);

    dispatch({
      type: MY_BOOKINGS_SUCCESS,
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAILED,
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
