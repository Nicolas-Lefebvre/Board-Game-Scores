// import data from 'src/data';
import {
  SAVE_GAMELIST,
} from '../actions/games';

export const initialState = {
  gameList: [],
  gameListLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_GAMELIST:
      return {
        ...state,
        gameList: action.gameList,
        gameListLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
