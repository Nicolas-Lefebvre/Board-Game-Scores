/* eslint-disable import/no-extraneous-dependencies */
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';

// import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from '../reducers';
import boardgamesMiddleware from '../middlewares/boardgamesMiddleware';
import gamesMiddleware from '../middlewares/gamesMiddleware';
import userMiddleware from '../middlewares/userMiddleware';

// une autre façon d'intégrer redux-devtools_extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    boardgamesMiddleware,
    gamesMiddleware,
    userMiddleware,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
