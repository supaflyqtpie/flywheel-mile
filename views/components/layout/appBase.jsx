import React from 'react';
import NavigationBar from './navigationBar.jsx'

const App = function app({ children }) {
  return (
    <div>
      <NavigationBar />
      { children }
    </div>
  );
};

module.exports = App;
