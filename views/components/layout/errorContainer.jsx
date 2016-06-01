const React = require('react');
const ApplicationBase = require('./applicationBase');

const Error = function error(props) {
  return (
    <ApplicationBase title="Flywheel-Mile">
      <div>
        <h3>Error</h3>
        <p>{props.message}</p>
        <br />
        <p>{props.err}</p>
      </div>
    </ApplicationBase>
  );
};


Error.propTypes = {
  message: React.PropTypes.string,
  err: React.PropTypes.object,
};

module.exports = Error;
