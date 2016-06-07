import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session';

const NavigationBar = function navigationBar({ email, signedIn, onLogoutClick }) {
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar3"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <img alt="Flywheel-Mile" height="30" width="200" />
            </Link>
          </div>
          <div id="navbar3" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              {signedIn?
                <li>
                  <Link to="/packages">My Packages</Link>
                </li> : false
              }
              {signedIn?
                <li>
                  <a onClick={onLogoutClick}>Logout</a>
                </li>
              :
                <li>
                  <Link to="/login">Login</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

NavigationBar.propTypes = {
  email: React.PropTypes.string,
  signedIn: React.PropTypes.bool,
  onLogoutClick: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    email: state.session.email,
    signedIn: state.session.signedIn,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
