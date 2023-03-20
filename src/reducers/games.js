// import data from 'src/data';
import {
  SAVE_GAMELIST,
  SAVE_GAMEINFOS,
} from '../actions/games';

export const initialState = {
  gameList: [],
  gameListLoaded: false,
  gameInfos: [],
  gameInfosLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_GAMELIST:
      return {
        ...state,
        gameList: action.gameList,
        gameListLoaded: true,
      };

    case SAVE_GAMEINFOS:
      return {
        ...state,
        gameInfos: action.gameInfos,
        gameInfosLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
