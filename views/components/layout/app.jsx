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
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};

module.exports = App;
