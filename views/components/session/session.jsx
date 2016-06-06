import React from 'react';
import LoginForm from './loginForm.jsx';
import RegistrationForm from './registrationForm.jsx';

class Session extends React.Component {

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

module.exports = Session;