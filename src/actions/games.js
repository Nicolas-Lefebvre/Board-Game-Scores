// === action types

export const SAVE_GAMELIST = 'SAVE_GAMELIST';
export const FETCH_GAMELIST = 'FETCH_GAMELIST';

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
