const React = require('react');
const LoginForm = require('./login_form');
// const RegistrationForm = require('./registration_form');

class SessionContainer extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="Absolute-Center is-Responsive vertical-center">
              <div className="col-sm-12 col-md-10 col-md-offset-1">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = SessionContainer;
