import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

function createAppStore(routeMiddleware, preloadedState) {
  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        routeMiddleware
      )
    );
  }
  return createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(thunkMiddleware, routeMiddleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
          window.devToolsExtension() : f => f
      )
    );
}

export default function configureStore(browserHistory, preloadedState) {
  const routeMiddleware = routerMiddleware(browserHistory);
  const store = createAppStore(routeMiddleware, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
