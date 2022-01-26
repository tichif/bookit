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
  UPDATE_PROFILE_RESET,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  CLEAR_ERROR,
} from '../constants/users';

// REGISTER USER reducers
export const userRegisterReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case REGISTER_USER_LOADING:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REGISTER_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
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

// LOAD USER reducers
export const userLoadReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOAD_USER_LOADING:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
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

// UPDATE USER reducers
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_LOADING:
      return {
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false,
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

// FORGOT USER reducers
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_LOADING:
      return {
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        loading: false,
        error: action.payload,
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
