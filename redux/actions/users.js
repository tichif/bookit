import axios from 'axios';

import {
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_LOADING,
  LOAD_USER_SUCCESS,
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

// Get user's profile
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_LOADING });

    const { data } = await axios.get(`/api/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILED,
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
