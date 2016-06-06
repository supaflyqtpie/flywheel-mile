import React from 'react';
import NavigationBar from './navigationBar';

const App = function app({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object,
};

module.exports = App;
