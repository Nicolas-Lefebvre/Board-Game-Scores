// === action types
export const SAVE_TOP5GAMES = 'SAVE_TOP5GAMES';
export const FETCH_TOP5GAMES = 'FETCH_TOP5GAMES';

export const SAVE_BOARDGAMELIST = 'SAVE_BOARDGAMELIST';
export const FETCH_BOARDGAMELIST = 'FETCH_BOARDGAMELIST';

export const FETCH_ALLBOARDGAMELIST = 'FETCH_ALLBOARDGAMELIST';
export const SAVE_ALLBOARDGAMELIST = 'SAVE_ALLBOARDGAMELIST';

export const FETCH_USERSBOARDGAMELIST = 'FETCH_USERSBOARDGAMELIST';
export const SAVE_USERSBOARDGAMELIST = 'SAVE_USERSBOARDGAMELIST';

// export const ADD_EXISTINGBOARDGAME = 'ADD_EXISTINGBOARDGAME';
export const FETCH_ALLCATEGORIES = 'FETCH_ALLCATEGORIES';
export const SAVE_ALLCATEGORIES = 'SAVE_ALLCATEGORIES';

export const SAVE_PLAYEDBOARDGAMELIST = 'SAVE_PLAYEDBOARDGAMELIST';
export const FETCH_PLAYEDBOARDGAMELIST = 'FETCH_PLAYEDBOARDGAMELIST';

export const FETCH_BOARDGAMEINFOS = 'FETCH_BOARDGAMEINFOS';
export const SAVE_BOARDGAMEINFOS = 'SAVE_BOARDGAMEINFOS';

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

export const fetchAllBoardgameList = () => ({
  type: FETCH_ALLBOARDGAMELIST,
  /* value: newValue, */
});
export const saveAllBoardgameList = (allBoardgameList) => ({
  type: SAVE_ALLBOARDGAMELIST,
  /* value: newValue, */
  allBoardgameList: allBoardgameList,
});

export const fetchUsersBoardgameList = () => ({
  type: FETCH_USERSBOARDGAMELIST,
  /* value: newValue, */
});
export const saveUsersBoardgameList = (usersBoardgameList) => ({
  type: SAVE_USERSBOARDGAMELIST,
  /* value: newValue, */
  usersBoardgameList: usersBoardgameList,
});

export const fetchAllCategories = () => ({
  type: FETCH_ALLCATEGORIES,
  /* value: newValue, */
});

export const saveAllCategories = (allCategories) => ({
  type: SAVE_ALLCATEGORIES,
  /* value: newValue, */
  allCategories: allCategories,
});
// export const addExistingBoardgame = (existingBoardgame) => ({
//   type: ADD_EXISTINGBOARDGAME,
//   /* value: newValue, */
//   existingBoardgame: existingBoardgame,
// });

export const savePlayedBoardgameList = (playedBoardgameList) => ({
  type: SAVE_PLAYEDBOARDGAMELIST,
  /* value: newValue, */
  playedBoardgameList: playedBoardgameList,
});

export const fetchPlayedBoardgameList = () => ({
  type: FETCH_PLAYEDBOARDGAMELIST,
  /* value: newValue, */
});

export const fetchBoardgameInfos = (boardgameId) => ({
  type: FETCH_BOARDGAMEINFOS,
  /* value: newValue, */
  boardgameId: boardgameId,
});

export const saveBoardgameInfos = (boardgameInfos) => ({
  type: SAVE_BOARDGAMEINFOS,
  /* value: newValue, */
  boardgameInfos: boardgameInfos,
});
