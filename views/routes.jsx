import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Session from './components/session/session';
import Packages from './components/packages/packages';
import Landing from './components/landing/landing';
import Rekt from './components/rekt/rekt';
import { resetAuthError } from './actions/session';
import { getSubscribedPackages, resetAddPackageError } from './actions/packages';

export default function getRoutes(store) {
  // client route authorization
  const requireLogin = (nextState, replace) => {
    const { session: { signedIn } } = store.getState();
    if (!signedIn) {
      replace('/');
    }
  };

  const loadPackages = () => {
    store.dispatch(getSubscribedPackages());
  };

  const resetLogin = () => {
    store.dispatch(resetAuthError());
  };

  const resetPackageError = () => {
    store.dispatch(resetAddPackageError());
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Session} onLeave={resetLogin} />
      <Route onEnter={requireLogin}>
        <Route path="packages" component={Packages} onEnter={loadPackages} onLeave={resetPackageError} />
      </Route>
      <Route path="*" component={Rekt} />
    </Route>
  );
}
