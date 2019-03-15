import { connect } from 'react-redux';

import { updatePassword, UpdatePasswordRequestPayload } from '../../redux/me';
import { MetaWithAsyncHandlers } from '../../types/commons';

import withResponseState from '../../hocs/withResponseState';

import UpdatePasswordForm from './UpdatePasswordForm';

const dispatchProps = dispatch => ({
  updatePassword: (payload: UpdatePasswordRequestPayload, meta: MetaWithAsyncHandlers<void>) => dispatch(updatePassword.request(payload, meta)),
});

export default connect(
  null,
  dispatchProps,
)(withResponseState(UpdatePasswordForm));
