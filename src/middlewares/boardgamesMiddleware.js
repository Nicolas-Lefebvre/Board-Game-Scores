import axios from 'axios';
// import { redirect, useNavigate } from 'react-router-dom';
// import {browserHistory} from 'react-router';
// import { useParams } from 'react-router-dom';

import {
  FETCH_TOP5GAMES,
  saveTop5Games,
  FETCH_BOARDGAMELIST,
  saveBoardgameList,
  FETCH_ALLBOARDGAMELIST,
  saveAllBoardgameList,
  // ADD_EXISTINGBOARDGAME,
  FETCH_ALLCATEGORIES,
  saveAllCategories,
  FETCH_PLAYEDBOARDGAMELIST,
  savePlayedBoardgameList,
  FETCH_BOARDGAMEINFOS,
  saveBoardgameInfos,
} from '../actions/boardgames';

const boardgamesMiddleware = (store) => (next) => (action) => {
  // const navigate = useNavigate();
  switch (action.type) {
    case FETCH_TOP5GAMES:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.get('http://127.0.0.1:8000/api/boardgames/top5')

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
        'http://127.0.0.1:8000/api/user/collection',
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

    case FETCH_ALLBOARDGAMELIST:
      axios.get(
        // URL
        'http://127.0.0.1:8000/api/boardgames',
        // options, notamment les headers
        {
        },
      )
        .then((response) => {
          // console.log(response);

          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(saveAllBoardgameList(response.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // RECUPERATION DE TOUTES LES CATEGORIES EXISTANTES
    case FETCH_ALLCATEGORIES:
      axios.get(
        // URL
        'http://127.0.0.1:8000/api/category',
        // options, notamment les headers
      )
        .then((response) => {
          // console.log(response);
          // on va enregistrer dans le state les infos de la réponse
          store.dispatch(saveAllCategories(response.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

      // AJOUT D'UN JEU EXISTANT DANS LA BDD A LA COLLECTION DU USER
      // case ADD_EXISTINGBOARDGAME:
      //   axios.post(
      //     // URL
      //     'http://127.0.0.1:8000/api/user/collection/boardgames/',
      //     // données
      //     {
      //       boardGames: action.existingBoardgame,
      //     },
      //     // options, notamment les headers
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem('BGStoken')}`,
      //       },
      //     },
      //   )
      //     .then(() => {
      //       console.log('LA REQUETE EST UN SUCCES. Jeu bien ajouté');
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      //     .finally(() => {
      //       // METTRE UNE REDIRECTION VERS LA LISTE DES JEUX
      //       // <redirect to="/jeux" />;
      //     });
      //   break;

    case FETCH_PLAYEDBOARDGAMELIST:
      axios.get(
        // URL
        'http://127.0.0.1:8000/api/user/boardgames',
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
        `http://127.0.0.1:8000/api/user/boardgames/${action.boardgameId}`,
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
