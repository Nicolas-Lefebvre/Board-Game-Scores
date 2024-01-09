// === action types

export const FETCH_PLAYERLISTNOSTATS = 'FETCH_PLAYERLISTNOSTATS';
export const SAVE_PLAYERLISTNOSTATS = 'SAVE_PLAYERLISTNOSTATS';

export const FETCH_PLAYERLIST = 'FETCH_PLAYERLIST';
export const SAVE_PLAYERLIST = 'SAVE_PLAYERLIST';

// export const FETCH_USERSPLAYERLIST = 'FETCH_USERSPLAYERLIST';
// export const SAVE_USERSPLAYERLIST = 'SAVE_USERSPLAYERLIST';

export const SAVE_LOSSPLAYERLIST = 'SAVE_LOSSPLAYERLIST';

export const FETCH_PLAYERINFOS = 'FETCH_PLAYERINFOS';

export const DELETE_PLAYER = 'DELETE_PLAYER';

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

// export const fetchUsersPlayerList = () => ({
//   type: FETCH_USERSPLAYERLIST,
//   /* value: newValue, */
// });
// export const saveUsersPlayerList = (usersPlayerList) => ({
//   type: SAVE_USERSPLAYERLIST,
//   /* value: newValue, */
//   usersPlayerList: usersPlayerList,
// });

export const saveLossPlayerList = (lossPlayerList) => ({
  type: SAVE_LOSSPLAYERLIST,
  /* value: newValue, */
  lossPlayerList: lossPlayerList,
});

export const deletePlayer = (playerId) => ({
  type: DELETE_PLAYER,
  /* value: newValue, */
  playerId: playerId,
});
