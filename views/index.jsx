import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './components/routes';

const rootElement = document.getElementById('root');
render(
  <Router history={hashHistory} routes={routes} />,
  rootElement
);
