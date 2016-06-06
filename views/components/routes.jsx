import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './layout/app';
import Session from './session/session';
import Packages from './package/packages';
import Landing from './landing';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="login" component={Session} />
    <Route path="packages" component={Packages} />
  </Route>
);

module.exports = routes;
