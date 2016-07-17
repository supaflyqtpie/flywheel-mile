import React from 'react';
import { connect } from 'react-redux';
import PackagesTable from './packagesTable';
import AddPackage from '../../containers/packages/addPackage';
import { getSubscribedPackages } from '../../actions/packages';

class Packages extends React.Component {

  static fetchData(dispatch) {
    dispatch(getSubscribedPackages());
  }

  componentDidMount() {
    Packages.fetchData(this.props.dispatch);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <AddPackage />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <PackagesTable />
          </div>
        </div>
      </div>
    );
  }
}

Packages.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(Packages);
