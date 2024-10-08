import axios from 'axios';

import {
  FETCH_GAMELIST,
  saveGameList,
  FETCH_GAMEINFOS,
  saveGameInfos,
} from '../actions/games';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../apiConfig';

const gamesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_GAMELIST:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get(
        `${baseUrl}/api/usergame`,
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

    case FETCH_GAMEINFOS:
      axios.get(
        // URL
        `${baseUrl}/api/user/game/${action.gameId}`,
        // options, notamment les headers
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          console.log(response.data.results);

          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(saveGameInfos(response.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }
  next(action);
};

export default gamesMiddleware;
