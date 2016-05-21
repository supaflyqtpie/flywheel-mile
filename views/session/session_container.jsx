var React = require('react');
var LoginForm = require('./login_form');

var SessionContainer = React.createClass({
  render: function() {
    return  <div>
              <div className="container">
                <div className="row">
                  <div className="Absolute-Center is-Responsive vertical-center">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>;
  }
});

module.exports = SessionContainer;
