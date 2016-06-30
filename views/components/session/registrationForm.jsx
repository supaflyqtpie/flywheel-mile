import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/session';

const RegistrationForm = ({ dispatch, registrationErrors }) => {
  let emailInput;
  let passwordInput;
  let passwordConfirmInput;

  return (
    <div>
      <h2 className="text-center">Sign Up</h2>
      <form
        className="form-horizontal"
        id="registerForm"
        onSubmit={e => {
          e.preventDefault();
          dispatch(registerUser(emailInput.value, passwordInput.value, passwordConfirmInput.value));
          passwordInput.value = emailInput.value = passwordConfirmInput.value ='';
        }}
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
        <div className="form-group input-group">
          <span className="input-group-addon">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            ref={node => {
              passwordConfirmInput = node;
            }}
          />
        </div>
        <div className={registrationErrors.length !== 0? 'alert alert-danger': ''}>
          <ul style={{ listStyleType: 'circle' }}>
            {registrationErrors.map(error =>
              <li key={error.key} >
                {error.message}
              </li>
            )}
          </ul>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

RegistrationForm.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  registrationErrors: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    registrationErrors: state.session.registrationErrors,
  };
}

export default connect(mapStateToProps)(RegistrationForm);
