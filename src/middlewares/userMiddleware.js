import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  SUBMIT_LOGIN,
  saveToken,
  CHECK_TOKEN_VALIDITY,
  setTokenValidity,
  setIsLogged,
  SET_ISLOGGED,
} from '../actions/user';

// Import de la valeur de baseUrl depuis le fichier apiConfig.js
import baseUrl from '../apiConfig';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.post(
        `${baseUrl}/api/login_check`,
        {
          username: action.username,
          password: action.password,
        },
      )
        .then((response) => {
          // console.log(response.data);
          console.log(response);
          store.dispatch(saveToken(response.data.token));
          localStorage.setItem('BGStoken', response.data.token);
        })

        .catch((error) => {
          console.log(error);
        });

      break;

    case SET_ISLOGGED:
      store.dispatch(setIsLogged(action.isLogged));

      break;

    case CHECK_TOKEN_VALIDITY:
      // -------------------------- VERIFICATION DU JWT TOKEN -------------------------
      if (localStorage.getItem('BGStoken')) {
        const decodedToken = jwtDecode(localStorage.getItem('BGStoken'));
        // console.log(decodedToken);

        const dateNow = new Date();
        console.log('date actuelle :', dateNow.getTime() / 1000);
        console.log('date d`expiration token :', decodedToken.exp);

        if (decodedToken.exp > dateNow.getTime() / 1000) {
          store.dispatch(setTokenValidity(true));
          // console.log('TOKEN VALIDE');
          // localStorage.removeItem('BGStoken');
        }
        else {
          store.dispatch(setTokenValidity(false));
          console.log('Token expiré');
          localStorage.removeItem('BGStoken');
        }
        // if (decodedToken.exp < dateNow.getTime()) {
        //   store.dispatch(setTokenValidity(false));
        //   localStorage.removeItem('BGStoken');
        // }
      }
      else {
        store.dispatch(setTokenValidity(false));
        console.log('Token inexistant');
      }
      // ------------------------------------------------------------------------------
      break;

    default:
  }
  next(action);
};

export default userMiddleware;
