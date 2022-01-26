import axios from 'axios';

import {
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_LOADING,
  LOAD_USER_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
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

// Update user's profile
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_LOADING });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/me/update`, user, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Erreur',
    });
  }
};

// forgot user'password
export const forgotUserPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_LOADING });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/password/forgot`, email, config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILED,
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
