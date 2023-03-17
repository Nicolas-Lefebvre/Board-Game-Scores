import axios from 'axios';
import { fetchFavoriteRecipes } from '../actions/recipes';

import { saveAuthData, SUBMIT_LOGIN } from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware userMiddleware: ', action);

  switch (action.type) {
    case SUBMIT_LOGIN:
      // attention à ne pas oublier le tiroir ;)
      // console.log(`il faut envoyer une requête avec
      // email=${store.getState().user.email} et password=${store.getState().user.password}`);

      // store.getState() => méthode sur le store qui permet de récupérer le state entier
      // Pas de paramètre, on ne peut pas sélectionner une info, on récupère tout le state
      // Quand on est avec useSelector dans un composant React, on DOIT sélectionner une
      // information dans le state, parce qu'en fait on s'abonne en même temps aux changements
      // de cette information dans le state (refaire le rendu du composant)

      axios.post(
        // URL
        'http://localhost:3001/login',
        // données
        {
          email: store.getState().user.email,
          password: store.getState().user.password,
        },
      )
        .then((response) => {
          // console.log(response);

          // response.data : {logged: true, pseudo: 'John', token: 'eyJhbG....JIUzI1'}

          // on dispatch une action pour envoyer les infos de la réponse dans le state
          const actionToDispatch = saveAuthData(
            response.data.pseudo,
            response.data.token,
            response.data.logged,
          );
          store.dispatch(actionToDispatch);

          // on est authentifié, on a un JWT dans le state => on peut demander au serveur
          // les recettes préférées de l'utilisateur connecté
          store.dispatch(fetchFavoriteRecipes());
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;
