import React from 'react';
import { connect } from 'react-redux';
import { userSignIn } from '../../actions/session';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';

class Session extends React.Component {

  constructor(props) {
    super(props);
    this.handleOnLoginSubmit = this.handleOnLoginSubmit.bind(this);
  }

  handleOnLoginSubmit(e, user) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(userSignIn(user));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-4">
            <LoginForm onSubmit={this.handleOnLoginSubmit} />
          </div>
          <div className="col-md-4">
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }

}

Session.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(Session);
