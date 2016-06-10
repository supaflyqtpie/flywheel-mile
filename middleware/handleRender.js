import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../views/store/configureStore';
import routes from '../views/components/routes';
import { signedIn } from '../views/actions/session';

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Flywheel-Mile</title>
        <link rel="stylesheet" href="/css/bootstrap.min.css" media="screen" charSet="utf-8" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/css/application.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/public/static/bundle.js"></script>
      </body>
    </html>
    `;
}

module.exports = function handleRender(req, res, next) {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      if (req.user) {
        store.dispatch(signedIn(req.user));
      }
      const htmlContent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.send(renderFullPage(htmlContent, store.getState()));
    } else {
      // continue any server routes - should remove on full client/server split
      next();
    }
  });
};
