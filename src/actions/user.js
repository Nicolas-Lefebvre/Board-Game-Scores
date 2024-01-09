// === action types

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SET_ISLOGGED = 'SET_ISLOGGED';
export const CHECK_TOKEN_VALIDITY = 'CHECK_TOKEN_VALIDITY';
export const SET_TOKEN_VALIDITY = 'SET_TOKEN_VALIDITY';
export const DISCONNECT = 'DISCONNECT';

// === action creators

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  /* value: newValue, */
  token: token,
});

export const setIsLogged = (isLogged) => ({
  type: SET_ISLOGGED,
  /* value: newValue, */
  isLogged: isLogged,
});

export const submitLogin = (username, password) => ({
  type: SUBMIT_LOGIN,
  /* value: newValue, */
  username: username,
  password: password,
});

export const checkTokenValidity = () => ({
  type: CHECK_TOKEN_VALIDITY,
  /* value: newValue, */
});

export const setTokenValidity = (isValid) => ({
  type: SET_TOKEN_VALIDITY,
  /* value: newValue, */
  isValid: isValid,
});

export const disconnect = () => ({
  type: DISCONNECT,
  /* value: newValue, */
});
