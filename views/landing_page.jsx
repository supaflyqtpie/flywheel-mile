var React = require('react');
var bootstrap = require('react-bootstrap');
var ApplicationContainer = require('./layout/application_container');
var SessionContainer = require('./session/session_container');

var LandingPage = React.createClass({
  render: function() {
    return  <ApplicationContainer title="Flywheel-Mile">
              <SessionContainer />
            </ApplicationContainer>
  }
});

module.exports = LandingPage;
