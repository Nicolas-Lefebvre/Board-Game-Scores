// === action types
export const SAVE_TOP5GAMES = 'SAVE_RECIPES';
export const FETCH_TOP5GAMES = 'FETCH_TOP5GAMES';

export const SAVE_BOARDGAMELIST = 'SAVE_BOARDGAMELIST';
export const FETCH_BOARDGAMELIST = 'FETCH_BOARDGAMELIST';

export const SAVE_PLAYEDBOARDGAMELIST = 'SAVE_PLAYEDBOARDGAMELIST';
export const FETCH_PLAYEDBOARDGAMELIST = 'FETCH_PLAYEDBOARDGAMELIST';

// === action creators
export const saveTop5Games = (top5Games) => ({
  type: SAVE_TOP5GAMES,
  /* value: newValue, */
  top5Games: top5Games,
});

export const fetchTop5Games = () => ({
  type: FETCH_TOP5GAMES,
  /* value: newValue, */
});

export const saveBoardgameList = (boardgameList) => ({
  type: SAVE_BOARDGAMELIST,
  /* value: newValue, */
  boardgameList: boardgameList,
});

export const fetchBoardgameList = () => ({
  type: FETCH_BOARDGAMELIST,
  /* value: newValue, */
});

export const savePlayedBoardgameList = (playedBoardgameList) => ({
  type: SAVE_PLAYEDBOARDGAMELIST,
  /* value: newValue, */
  playedBoardgameList: playedBoardgameList,
});

export const fetchPlayedBoardgameList = () => ({
  type: FETCH_PLAYEDBOARDGAMELIST,
  /* value: newValue, */
});
