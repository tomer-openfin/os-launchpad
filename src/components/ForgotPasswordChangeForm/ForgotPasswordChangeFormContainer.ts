import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { confirmPasswordRequest } from '../../redux/me';

import { Values } from './ForgotPasswordChangeForm';
import ForgotPasswordChangeFormik from './ForgotPasswordChangeFormik';

interface OwnProps {
  username: string;
  successCb: () => void;
  errorCb: (message: string) => void;
}

interface MapDispatch {
  handleSubmitValues: (values: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps: OwnProps): MapDispatch => ({
  handleSubmitValues: (values: Values) => {
    const { errorCb, successCb, username } = ownProps;

    const payload = {
      code: values.code,
      newPassword: values.password,
      username,
    };

    return new Promise(resolve => {
      dispatch(
        confirmPasswordRequest(payload, {
          errorCb: error => {
            errorCb(error);
            resolve();
          },
          successCb,
        }),
      );
    });
  },
});

export default connect<null, MapDispatch, OwnProps>(
  null,
  mapDispatch,
)(ForgotPasswordChangeFormik);
