import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware = applyMiddleware(promise(), thunk, logger);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    middleware,
  );
}
