// === action types
export const SAVE_TOP5GAMES = 'SAVE_RECIPES';
export const FETCH_TOP5GAMES = 'FETCH_TOP5GAMES';

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

// export const fetchFavoriteRecipes = () => ({
//   type: FETCH_FAVORITE_RECIPES,
// });

// export const saveFavoriteRecipes = (recipes) => ({
//   type: SAVE_FAVORITE_RECIPES,
//   /* value: newValue, */
//   recipes: recipes,
// });
