// import data from 'src/data';
import {
  SAVE_TOKEN,
  SET_TOKEN_VALIDITY,
  DISCONNECT,
} from '../actions/user';

export const initialState = {
  token: '',
  isLogged: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLogged: true,
      };

    case SET_TOKEN_VALIDITY:
      return {
        ...state,
        isLogged: action.isLogged,
      };

    case DISCONNECT:
      return {
        ...state,
        isLogged: false,
        token: '',
      };

    default:
      return state;
  }
};

export default reducer;
