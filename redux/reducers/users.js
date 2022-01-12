import {
  REGISTER_USER_FAILED,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
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
