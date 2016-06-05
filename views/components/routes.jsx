import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppBase from './layout/appBase';
import Session from './session/session';
import Packages from './package/packages';
import Landing from './landing';

const routes = (
  <Route path="/" component={AppBase}>
    <IndexRoute component={Landing} />
    <Route path="login" component={Session} />
    <Route path="packages" component={Packages} />
  </Route>
);

module.exports = routes;
