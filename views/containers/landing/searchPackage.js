import { connect } from 'react-redux';
import PackageForm from '../../components/packages/packageForm';
import { queryPackage } from '../../actions/packages';

function mapStateToProps(state) {
  return {
    isProcessing: state.packages.isAdding,
    packageError: state.packages.addPackageError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (inputCarrier, inputTrackingNumber) => {
      dispatch(queryPackage(inputCarrier, inputTrackingNumber));
    },
  };
}

const SearchPackage = connect(mapStateToProps, mapDispatchToProps)(PackageForm);

export default SearchPackage;
