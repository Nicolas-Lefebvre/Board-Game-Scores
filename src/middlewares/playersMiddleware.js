/* eslint-disable max-len */
import axios from 'axios';

import {
  FETCH_PLAYERLISTNOSTATS,
  savePlayerListNoStats,
  FETCH_PLAYERLIST,
  savePlayerList,
  saveLossPlayerList,
  // FETCH_PLAYERINFOS,
  DELETE_PLAYER,
} from '../actions/players';

const playersMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_PLAYERLISTNOSTATS:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get(
        'http://127.0.0.1:8000/api/user/players',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data);
          store.dispatch(savePlayerListNoStats(response.data.results));
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });

      break;

    case FETCH_PLAYERLIST:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get(
        'http://127.0.0.1:8000/api/user/players/stats',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data);
          store.dispatch(savePlayerList(response.data.results));
          store.dispatch(saveLossPlayerList(response.data.results.filter((filteredPlayer) => (filteredPlayer.is_winner === 0))));

          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });

      break;

      // case FETCH_PLAYERINFOS:
      //   axios.get(
      //     // URL
      //     `http://127.0.0.1:8000/api/user/game/${action.gameId}`,
      //     // options, notamment les headers
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
      //       },
      //     },
      //   )
      //     .then((response) => {
      //       console.log(response);
      //       console.log(response.data.results);

      //       // on va enregistrer dans le state les infos de la réponse
      //       store.dispatch(saveGameInfos(response.data.results));
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   break;

    case DELETE_PLAYER:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.delete(
        `http://127.0.0.1:8000/api/player/${action.playerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then(() => {
        // console.log(response.data);

          axios.get(
            'http://127.0.0.1:8000/api/user/players',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
              },
            },
          )
            .then((response) => {
              // console.log(response.data);
              store.dispatch(savePlayerListNoStats(response.data.results));
            })

            .catch((error) => {
              console.log(error);
            });

          axios.get(
            'http://127.0.0.1:8000/api/user/players/stats',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
              },
            },
          )
            .then((response) => {
              // console.log(response.data);
              store.dispatch(savePlayerList(response.data.results));
              store.dispatch(saveLossPlayerList(response.data.results.filter((filteredPlayer) => (filteredPlayer.is_winner === 0))));

              console.log(response);
            })

            .catch((error) => {
              console.log(error);
            });
        })

        .catch((error) => {
          console.log(error);
        });

      break;

    default:
  }
  next(action);
};

export default playersMiddleware;
