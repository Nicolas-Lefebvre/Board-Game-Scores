// import data from 'src/data';
import {
  SAVE_PLAYEDBOARDGAMELIST,
  SAVE_BOARDGAMELIST,
  SAVE_ALLBOARDGAMELIST,
  SAVE_TOP5GAMES,
  SAVE_BOARDGAMEINFOS,
  SAVE_ALLCATEGORIES,
  SAVE_USERSBOARDGAMELIST,
} from '../actions/boardgames';

export const initialState = {
  top5Games: [],
  top5GamesLoaded: false,
  boardgameList: [],
  boardgameListLoaded: false,
  allBoardgameList: [],
  allBoardgameListLoaded: false,
  existingBoardgamesDisabled: true,
  usersBoardgameList: [],
  allCategories: [],
  allCategoriesLoaded: [],
  playedBoardgameList: [],
  playedBoardgameListLoaded: false,
  boardgameInfos: [],
  boardgameInfosLoaded: false,
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

    case SAVE_ALLBOARDGAMELIST:
      return {
        ...state,
        allBoardgameList: action.allBoardgameList,
        allBoardgameListLoaded: true,
        existingBoardgamesDisabled: false,
      };

    case SAVE_USERSBOARDGAMELIST:
      return {
        ...state,
        usersBoardgameList: action.usersBoardgameList,
        usersBoardgameListLoaded: true,
      };

    case SAVE_ALLCATEGORIES:
      return {
        ...state,
        allCategories: action.allCategories,
        allBoardgameListLoaded: true,
      };

    case SAVE_BOARDGAMEINFOS:
      return {
        ...state,
        boardgameInfos: action.boardgameInfos,
        boardgameInfosLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
