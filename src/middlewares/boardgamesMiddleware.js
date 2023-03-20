import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FETCH_TOP5GAMES,
  saveTop5Games,
  FETCH_BOARDGAMELIST,
  saveBoardgameList,
  FETCH_PLAYEDBOARDGAMELIST,
  savePlayedBoardgameList,
  FETCH_BOARDGAMEINFOS,
  saveBoardgameInfos,
} from '../actions/boardgames';

const boardgamesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TOP5GAMES:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get('http://nicolas-lefebvre.vpnuser.lan:8000/api/boardgames/top5')

        .then((response) => {
          // console.log(response.data);
          store.dispatch(saveTop5Games(response.data.results));
        })

        .catch((error) => {
          console.log(error);
        });

      break;

    case FETCH_BOARDGAMELIST:
      axios.get(
        // URL
        'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/collection',
        // options, notamment les headers
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          // console.log(response);

          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(saveBoardgameList(response.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case FETCH_PLAYEDBOARDGAMELIST:
      axios.get(
        // URL
        'http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgames',
        // options, notamment les headers
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          // console.log(response);

          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(savePlayedBoardgameList(response.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case FETCH_BOARDGAMEINFOS:
      axios.get(
        // URL
        `http://nicolas-lefebvre.vpnuser.lan:8000/api/user/boardgames/${action.boardgameId}`,
        // options, notamment les headers
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          console.log(response.data.result);

          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(saveBoardgameInfos(response.data.result));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }
  next(action);
};

export default boardgamesMiddleware;
