import { connect } from 'react-redux';

import { updatePasswordRequest } from '../../redux/me';
import UpdatePasswordForm from './UpdatePasswordForm';

const dispatchProps = {
  updatePassword: updatePasswordRequest,
};

export default connect(
  null,
  dispatchProps,
)(UpdatePasswordForm);
