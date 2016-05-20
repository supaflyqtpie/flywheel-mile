var React = require('react');
var LandingPage = require('../landing_page');

var ApplicationContainer = React.createClass({
  render: function() {
    return (
      <html>
        <head>Flywheel Mile</head>
        <body><LandingPage /></body>
      </html>
    );
  }
});

module.exports = ApplicationContainer;
