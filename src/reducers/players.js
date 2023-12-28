// import data from 'src/data';
import {
  SAVE_PLAYERLISTNOSTATS,
  SAVE_PLAYERLIST,
  SAVE_LOSSPLAYERLIST,
  // SAVE_PLAYERINFOS,
} from '../actions/players';

export const initialState = {
  playerList: [],
  playerListNoStatsLoaded: false,
  playerInfos: [],
  playerInfosLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_PLAYERLISTNOSTATS:
      return {
        ...state,
        playerListNoStats: action.playerListNoStats,
        playerListNoStatsLoaded: true,
      };

    case SAVE_PLAYERLIST:
      return {
        ...state,
        playerList: action.playerList,
        playerListLoaded: true,
      };

    case SAVE_LOSSPLAYERLIST:
      return {
        ...state,
        lossPlayerList: action.lossPlayerList,
      };

      // case SAVE_PLAYERINFOS:
      //   return {
      //     ...state,
      //     gameInfos: action.gameInfos,
      //     gameInfosLoaded: true,
      //   };

    default:
      return state;
  }
};

export default reducer;
