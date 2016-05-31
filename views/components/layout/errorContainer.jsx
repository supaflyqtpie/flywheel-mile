const React = require('react');
const ApplicationContainer = require('./applicationContainer');

const Error = function error(props) {
  return (
    <ApplicationContainer title="Flywheel-Mile">
      <div>
        <h3>Error</h3>
        <p>{props.message}</p>
        <br />
        <p>{props.err}</p>
      </div>
    </ApplicationContainer>
  );
};


Error.propTypes = {
  message: React.PropTypes.string,
  err: React.PropTypes.object,
};

module.exports = Error;
