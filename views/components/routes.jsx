import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './layout/app';
import Session from './session/session';
import Packages from './package/packages';
import Landing from './landing/landing';
import Rekt from './rekt/rekt';

export default function getRoutes(store) {
  // client route authorization
  const requireLogin = (nextState, replace) => {
    const { session: { signedIn } } = store.getState();
    if (!signedIn) {
      replace('/');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Session} />
      <Route onEnter={requireLogin}>
        <Route path="packages" component={Packages} />
      </Route>
      <Route path="*" component={Rekt} />
    </Route>
  );
}
