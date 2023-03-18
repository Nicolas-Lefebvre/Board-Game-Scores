import axios from 'axios';

import {
  FETCH_GAMELIST,
  saveGameList,
} from '../actions/games';

const gamesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_GAMELIST:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get(
        'http://nicolas-lefebvre.vpnuser.lan:8000/api/usergame',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data);
          store.dispatch(saveGameList(response.data.results));
          console.log(response);
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
