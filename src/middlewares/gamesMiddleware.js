import axios from 'axios';

import {
  FETCH_TOP5GAMES,
  saveTop5Games,
} from '../actions/boardgames';

const gamesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TOP5GAMES:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get('http://nicolas-lefebvre.vpnuser.lan:8000/api/boardgames/top5')

        .then((response) => {
          // console.log(response.data);
          const actionToDispatch = saveTop5Games(response.data.results);
          store.dispatch(actionToDispatch);
        })

        .catch((error) => {
          console.log(error);
        });

      break;

      // case FETCH_FAVORITE_RECIPES:
      //   axios.get(
      //     // URL
      //     'http://localhost:3001/favorites',
      //     // options, notamment les headers
      //     {
      //       headers: {
      //         Authorization: `Bearer ${store.getState().user.token}`,
      //       },
      //     },
      //   )
      //     .then((response) => {
      //       // console.log(response);

      //       // on va enregistrer dans le state les infos de la réponse
      //       store.dispatch(saveFavoriteRecipes(response.data.favorite));
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   break;

    default:
  }
  next(action);
};

export default gamesMiddleware;
