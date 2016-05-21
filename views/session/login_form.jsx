const React = require('react');

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <form action="" id="loginForm">
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-user" aria-hidden="true" />
            </span>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="username"
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
          <div className="form-group">
            <button type="button" className="btn btn-def btn-block">Login</button>
          </div>
          <div className="form-group text-center">
            <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = LoginForm;
