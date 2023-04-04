// === action types

export const FETCH_PLAYERLISTNOSTATS = 'FETCH_PLAYERLISTNOSTATS';
export const SAVE_PLAYERLISTNOSTATS = 'SAVE_PLAYERLISTNOSTATS';

export const FETCH_PLAYERLIST = 'FETCH_PLAYERLIST';
export const SAVE_PLAYERLIST = 'SAVE_PLAYERLIST';
export const SAVE_LOSSPLAYERLIST = 'SAVE_LOSSPLAYERLIST';

export const FETCH_PLAYERINFOS = 'FETCH_PLAYERINFOS';

// === action creators

export const savePlayerListNoStats = (playerListNoStats) => ({
  type: SAVE_PLAYERLISTNOSTATS,
  /* value: newValue, */
  playerListNoStats: playerListNoStats,
});

export const fetchPlayerListNoStats = () => ({
  type: FETCH_PLAYERLISTNOSTATS,
  /* value: newValue, */
});

export const fetchPlayerList = () => ({
  type: FETCH_PLAYERLIST,
  /* value: newValue, */
});

export const savePlayerList = (playerList) => ({
  type: SAVE_PLAYERLIST,
  /* value: newValue, */
  playerList: playerList,
});

export const saveLossPlayerList = (lossPlayerList) => ({
  type: SAVE_LOSSPLAYERLIST,
  /* value: newValue, */
  lossPlayerList: lossPlayerList,
});
