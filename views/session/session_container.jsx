const React = require('react');
const LoginForm = require('./login_form');
const RegistrationForm = require('./registration_form');

class SessionContainer extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-4">
            <LoginForm />
          </div>
          <div className="col-md-4">
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }

}

module.exports = SessionContainer;
