import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { LoginErrorPayload, loginWithNewPassword } from '../../redux/me';

import { Values } from './ChangePasswordForm';
import ChangePasswordFormik from './ChangePasswordFormik';

interface OwnProps {
  errorCb: (payload: LoginErrorPayload) => void;
  session: string;
  username: string;
}

interface MapDispatch {
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps: OwnProps): MapDispatch => ({
  handleSubmitValues: (payload: Values) => {
    const { errorCb, session, username } = ownProps;

    return new Promise(resolve => {
      dispatch(
        loginWithNewPassword(
          { username, session, newPassword: payload.newPassword },
          {
            errorCb: error => {
              errorCb(error);
              resolve();
            },
          },
        ),
      );
    });
  },
});

export default connect<null, MapDispatch, OwnProps>(
  null,
  mapDispatch,
)(ChangePasswordFormik);
