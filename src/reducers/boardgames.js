// import data from 'src/data';
import { SAVE_TOP5GAMES } from '../actions/boardgames';

export const initialState = {
  top5Games: [],
  // favorite: [],
  // indique si les recettes sont en cours de chargement
  top5GamesLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TOP5GAMES:

      return {
        ...state,
        top5Games: action.top5Games,
        top5GamesLoaded: true,
      };

      // case SAVE_FAVORITE_RECIPES:
      //   return {
      //     ...state,
      //     favorite: action.recipes,
      //   };

    default:
      return state;
  }
};

export default reducer;
