import React from 'react';

class RegistrationForm extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-center">Sign Up</h2>
        <form className="form-horizontal" action="/user" method="post" id="registerForm">
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-user" aria-hidden="true" />
            </span>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email address"
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
              placeholder="Password"
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
              placeholder="Confirm Password"
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
