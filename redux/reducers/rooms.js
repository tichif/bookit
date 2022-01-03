import {
  ALL_ROOMS_FAILED,
  ALL_ROOMS_SUCCESS,
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
        error: null,
      };
    default:
      return state;
  }
};
