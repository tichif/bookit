import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAIL_FAILED,
  ROOM_DETAIL_SUCCESS,
  CREATE_REVIEW_FAILED,
  CREATE_REVIEW_LOADING,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  REVIEW_AVAILABILITY_FAILED,
  REVIEW_AVAILABILITY_LOADING,
  REVIEW_AVAILABILITY_SUCCESS,
  ADMIN_ROOMS_FAILED,
  ADMIN_ROOMS_LOADING,
  ADMIN_ROOMS_SUCCESS,
  CREATE_ROOM_FAILED,
  CREATE_ROOM_LOADING,
  CREATE_ROOM_RESET,
  CREATE_ROOM_SUCCESS,
  CLEAR_ERROR,
} from '../constants/rooms';

// all rooms reducers
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ADMIN_ROOMS_LOADING:
      return {
        loading: true,
      };
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };
    case ADMIN_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };
    case ALL_ROOMS_FAILED:
      return {
        error: action.payload,
      };
    case ADMIN_ROOMS_FAILED:
      return {
        error: action.payload,
        loadinG: false,
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

// ROOM DETAILS reducers
export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAIL_SUCCESS:
      return {
        room: action.payload,
      };
    case ROOM_DETAIL_FAILED:
      return {
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

// create review reducer
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_LOADING:
      return {
        loading: true,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case CREATE_REVIEW_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_REVIEW_RESET:
      return {
        success: false,
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

// create review reducer
export const reviewAvailabilityReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_LOADING:
      return {
        loading: true,
      };
    case REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload,
      };
    case REVIEW_AVAILABILITY_FAILED:
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

// create room reducer
export const createRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case CREATE_ROOM_LOADING:
      return {
        loading: true,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };
    case CREATE_ROOM_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_ROOM_RESET:
      return {
        success: false,
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
