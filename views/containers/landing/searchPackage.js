import { connect } from 'react-redux';
import PackageForm from '../../components/packages/packageForm';

function mapStateToProps(state) {
  return {
    isProcessing: false,
    packageError: '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (inputCarrier, inputTrackingNumber) => {
    },
  };
}

const SearchPackage = connect(mapStateToProps, mapDispatchToProps)(PackageForm);

export default SearchPackage;
