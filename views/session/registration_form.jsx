const React = require('react');

class RegistrationForm extends React.Component {
  render() {
    return (
      <div>
        <div className="h1 text-center">Register</div>
        <form className="form-horizontal" action="http://localhost:3000/register" method="post" id="registerForm">
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-user" aria-hidden="true" />
            </span>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="email@address.com"
            />
          </div>
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-def btn-block" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

module.exports = RegistrationForm;
