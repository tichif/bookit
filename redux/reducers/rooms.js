import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAIL_FAILED,
  ROOM_DETAIL_SUCCESS,
  CLEAR_ERROR,
} from '../constants/rooms';

// all rooms reducers
export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resultsPerPage: action.payload.resultsPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };
    case ALL_ROOMS_FAILED:
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
