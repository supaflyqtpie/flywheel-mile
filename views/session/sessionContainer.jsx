const React = require('react');
const LoginForm = require('./loginForm');
const RegistrationForm = require('./registrationForm');

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
