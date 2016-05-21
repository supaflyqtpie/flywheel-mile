const React = require('react');
const ApplicationContainer = require('./layout/application_container');
const SessionContainer = require('./session/session_container');

const LandingPage = function landingPage() {
  return (
    <ApplicationContainer title="Flywheel-Mile">
      <SessionContainer />
    </ApplicationContainer>
  );
};

module.exports = LandingPage;
