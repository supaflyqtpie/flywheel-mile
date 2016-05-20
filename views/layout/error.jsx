var React = require('react');

var Error = React.createClass({
  render: function() {
    return  <div>
              <h3>Error</h3>
              <p>{this.props.message}</p>
              <p>{this.props.err}</p>
            </div>;
  }
});

module.exports = Error;
