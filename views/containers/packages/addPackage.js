import { connect } from 'react-redux';
import { requestToAddPackage } from '../../actions/packages';
import PackageForm from '../../components/packages/packageForm';

function mapStateToProps(state) {
  return {
    isProcessing: state.packages.isAdding,
    packageError: state.packages.addPackageError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (inputCarrier, inputTrackingNumber) => {
      dispatch(requestToAddPackage(inputCarrier, inputTrackingNumber));
    },
  };
}

const AddPackage = connect(mapStateToProps, mapDispatchToProps)(PackageForm);

export default AddPackage;
