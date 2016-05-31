const React = require('react');
const ApplicationContainer = require('./layout/applicationContainer');
const NavigationBar = require('./layout/navigationBar');
const SessionContainer = require('./session/sessionContainer');

const LandingContainer = function landingPage() {
  return (
    <ApplicationContainer title="Flywheel-Mile">
      <NavigationBar />
      <SessionContainer />
    </ApplicationContainer>
  );
};

module.exports = LandingContainer;
