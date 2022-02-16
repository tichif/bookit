import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAIL_FAILED,
  ROOM_DETAIL_SUCCESS,
  CREATE_REVIEW_FAILED,
  CREATE_REVIEW_LOADING,
  CREATE_REVIEW_SUCCESS,
  REVIEW_AVAILABILITY_FAILED,
  REVIEW_AVAILABILITY_LOADING,
  REVIEW_AVAILABILITY_SUCCESS,
  CLEAR_ERROR,
} from '../constants/rooms';

// Get all rooms
export const getAllRooms =
  (req, page = 1, location = '', guests = '', category = '') =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/rooms?page=${page}&location=${location}`;
      if (guests) {
        link = link.concat(`&guestCapacity=${guests}`);
      }

      if (category) {
        link = link.concat(`&category=${category}`);
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : 'Erreur',
      });
    }
  };

// Get room details
export const getRoomDetail = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({
      type: ROOM_DETAIL_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAIL_FAILED,
      payload: error.response.data.message,
    });
  }
};

//  crete review
export const createReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_LOADING });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/reviews`, review, config);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILED,
      payload: error.response.data.message,
    });
  }
};

//  check review availability
export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABILITY_LOADING });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(
      `/api/reviews/check_review_availability?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAILED,
      payload: error.response.data.message,
    });
  }
};

// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
