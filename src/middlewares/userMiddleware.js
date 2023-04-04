import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {
  SUBMIT_LOGIN,
  saveToken,
  CHECK_TOKEN_VALIDITY,
  setTokenValidity,
} from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      // console.log('ici appel à lAPI');
      // traitement, par exemple requête API avec axios
      axios.post(
        'http://127.0.0.1:8000/api/login_check',
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

    case CHECK_TOKEN_VALIDITY:
      // -------------------------- VERIFICATION DU JWT TOKEN -------------------------
      if (localStorage.getItem('BGStoken')) {
        const decodedToken = jwtDecode(localStorage.getItem('BGStoken'));
        console.log(decodedToken);

        const dateNow = new Date();
        console.log(dateNow.getTime());

        if (decodedToken.exp > dateNow.getTime()) {
          store.dispatch(setTokenValidity(false));
          localStorage.removeItem('BGStoken');
        }
      }
      // ------------------------------------------------------------------------------
      break;

    default:
  }
  next(action);
};

export default userMiddleware;
