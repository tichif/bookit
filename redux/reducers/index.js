import { combineReducers } from 'redux';

import { allRoomsReducer } from './rooms';

const reducer = combineReducers({
  allRooms: allRoomsReducer,
});

export default reducer;
