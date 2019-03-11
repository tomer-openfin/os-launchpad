import { connect } from 'react-redux';

import { updatePasswordRequest } from '../../redux/me';
import UpdatePasswordForm from './UpdatePasswordForm';

const mapDispatch = {
  updatePassword: updatePasswordRequest,
};

export default connect(
  null,
  mapDispatch,
)(UpdatePasswordForm);
