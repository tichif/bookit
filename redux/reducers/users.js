import {
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOAD_USER_LOADING,
  LOAD_USER_SUCCESS,
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
