import axios from 'axios';

import {
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  CLEAR_ERROR,
} from '../constants/users';

// Register user
export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_LOADING });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/auth/register', user, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILED,
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

// clear error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
