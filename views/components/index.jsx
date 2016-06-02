const React = require('react');
const ApplicationBase = require('./layout/applicationBase');
const SessionComponent = require('./session/sessionComponent');

const Index = function landingPage() {
  return (
    <ApplicationBase title="Flywheel-Mile">
      <SessionComponent />
    </ApplicationBase>
  );
};

module.exports = Index;
