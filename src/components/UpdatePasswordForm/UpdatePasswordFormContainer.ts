import { connect } from 'react-redux';

import { updatePasswordRequest, UpdatePasswordRequestPayload } from '../../redux/me';
import { MetaWithCallbacks } from '../../types/commons';

import withResponseState from '../../hocs/withResponseState';

import UpdatePasswordForm from './UpdatePasswordForm';

const dispatchProps = (dispatch, ownProps) => ({
  updatePassword: (payload: UpdatePasswordRequestPayload, meta: MetaWithCallbacks) => dispatch(updatePasswordRequest(payload, meta)),
});

export default connect(
  null,
  dispatchProps,
)(withResponseState(UpdatePasswordForm));
