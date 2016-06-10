import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/session';

const LoginForm = ({ dispatch, authError }) => {
  let emailInput;
  let passwordInput;

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!emailInput.value.trim() || !passwordInput.value) {
            return;
          }
          dispatch(loginUser(emailInput.value, passwordInput.value));
          passwordInput.value = emailInput.value = '';
        }}
        id="loginForm"
      >
        <div className="form-group input-group">
          <span className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true" />
          </span>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Email Address"
            ref={node => {
              emailInput = node;
            }}
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
            ref={node => {
              passwordInput = node;
            }}
          />
        </div>
        {authError?
          <div className="panel panel-danger">
            <div className="panel-heading">Oops! Incorrect username or Password</div>
          </div> : false
        }
        <div className="form-group">
          <button type="submit" className="btn btn-def btn-block">Login</button>
        </div>
        <div className="form-group text-center">
          <a href="#">Forgot Password</a>&nbsp;|&nbsp;<a href="#">Support</a>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  authError: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    authError: state.session.authError,
  };
}

export default connect(mapStateToProps)(LoginForm);
