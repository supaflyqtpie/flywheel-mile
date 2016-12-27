import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/layout/app';
import Session from './components/session/session';
import Packages from './components/packages/packages';
import Landing from './components/landing/landing';
import Rekt from './components/rekt/rekt';
import PackageDetail from './components/packages/packageDetail';
import { resetAuthError } from './actions/session';
import { resetAddPackageError, resetGetPackagesError } from './actions/packages';

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

  const resetPackageError = () => {
    store.dispatch(resetAddPackageError());
    store.dispatch(resetGetPackagesError());
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="login" component={Session} onLeave={resetLogin} />
      <Route path="details" component={PackageDetail} />
      <Route onEnter={requireLogin}>
        <Route path="packages" component={Packages} onLeave={resetPackageError} />
      </Route>
      <Route path="*" component={Rekt} />
    </Route>
  );
}
