const React = require('react');
const ApplicationBase = require('./layout/applicationBase');
const NavigationBar = require('./layout/navigationBar');
const SessionContainer = require('./session/sessionContainer');

const LandingContainer = function landingPage() {
  return (
    <ApplicationBase title="Flywheel-Mile">
      <NavigationBar />
      <SessionContainer />
    </ApplicationBase>
  );
};

module.exports = LandingContainer;
