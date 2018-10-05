import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger';

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // options like actionSanitizer, stateSanitizer
      })
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(logger, thunk));

  // const enhancer = applyMiddleware(thunk)

  return createStore(rootReducer, initialState, enhancer);
}
