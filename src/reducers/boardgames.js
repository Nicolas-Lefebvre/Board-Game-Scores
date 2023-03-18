// import data from 'src/data';
import {
  SAVE_PLAYEDBOARDGAMELIST,
  SAVE_BOARDGAMELIST,
  SAVE_TOP5GAMES,
} from '../actions/boardgames';

export const initialState = {
  top5Games: [],
  top5GamesLoaded: false,
  boardgameList: [],
  boardgameListLoaded: false,
  playedBoardgameList: [],
  playedBoardgameListLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TOP5GAMES:
      return {
        ...state,
        top5Games: action.top5Games,
        top5GamesLoaded: true,
      };

    case SAVE_PLAYEDBOARDGAMELIST:
      return {
        ...state,
        playedBoardgameList: action.playedBoardgameList,
        playedBoardgameListLoaded: true,
      };

    case SAVE_BOARDGAMELIST:
      return {
        ...state,
        boardgameList: action.boardgameList,
        boardgameListLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
