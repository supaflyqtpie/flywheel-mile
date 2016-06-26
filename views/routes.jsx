import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Session from './components/session/session';
import Packages from './components/packages/packages';
import Landing from './components/landing/landing';
import Rekt from './components/rekt/rekt';
import { resetAuthError } from './actions/session';

export default function getRoutes(store) {
  // client route authorization
  const requireLogin = (nextState, replace) => {
    const { session: { signedIn } } = store.getState();
    if (!signedIn) {
      replace('/');
    }
  };

  const resetLogin = () => {
    store.dispatch(resetAuthError());
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Session} onLeave={resetLogin} />
      <Route onEnter={requireLogin}>
        <Route path="packages" component={Packages} />
      </Route>
      <Route path="*" component={Rekt} />
    </Route>
  );
}
