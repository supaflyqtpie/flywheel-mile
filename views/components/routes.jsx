import React from 'react';
import { Route, IndexRoute } from 'react-router'
import AppBase from './layout/appBase.jsx'
import Session from './session/session.jsx'
import Landing from './landing.jsx'

const routes = (
  <Route path="/" component={AppBase}>
    <IndexRoute component={Landing} />
    <Route path="/login" component={Session} />
  </Route>
)

module.exports = routes;
