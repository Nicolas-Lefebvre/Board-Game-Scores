/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';

import boardgamesReducer from './boardgames';
import gamesReducer from './games';
import userReducer from './user';
import playersReducer from './players';

// un reducer qui combine les autres (le store veut un seul reducer)
const rootReducer = combineReducers({
  // nom du tiroir: reducer qui s'occupe de ce tiroir
  boardgames: boardgamesReducer,
  games: gamesReducer,
  user: userReducer,
  players: playersReducer,
});

export default rootReducer;
