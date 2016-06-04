import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppBase from './layout/appBase.jsx';
import Session from './session/session.jsx';
import Packages from './package/packages.jsx';
import Landing from './landing.jsx';

const routes = (
  <Route path="/" component={AppBase}>
    <IndexRoute component={Landing} />
    <Route path="login" component={Session} />
    <Route path="packages" component={Packages} />
  </Route>
);

module.exports = routes;
