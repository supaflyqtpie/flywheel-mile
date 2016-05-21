var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return  <div>
              <form action="" id="loginForm">
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input className="form-control" type="text" name='username' placeholder="username"/>
                </div>
                <div className="form-group input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                  <input className="form-control" type="password" name='password' placeholder="password"/>
                </div>
                <div className="form-group">
                  <button type="button" className="btn btn-def btn-block">Login</button>
                </div>
                <div className="form-group text-center">
                  <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
                </div>
              </form>
            </div>;
  }
});

module.exports = LoginForm;
