// === action types

export const SAVE_GAMELIST = 'SAVE_GAMELIST';
export const FETCH_GAMELIST = 'FETCH_GAMELIST';
export const FETCH_GAMEINFOS = 'FETCH_GAMEINFOS';
export const SAVE_GAMEINFOS = 'SAVE_GAMEINFOS';

// === action creators

export const saveGameList = (gameList) => ({
  type: SAVE_GAMELIST,
  /* value: newValue, */
  gameList: gameList,
});

export const fetchGameList = () => ({
  type: FETCH_GAMELIST,
  /* value: newValue, */
});

export const fetchGameInfos = (gameId) => ({
  type: FETCH_GAMEINFOS,
  /* value: newValue, */
  gameId: gameId,
});

export const saveGameInfos = (gameInfos) => ({
  type: SAVE_GAMEINFOS,
  /* value: newValue, */
  gameInfos: gameInfos,
});
