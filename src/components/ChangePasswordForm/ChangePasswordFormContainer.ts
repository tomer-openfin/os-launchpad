import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { login, LoginErrorPayload } from '../../redux/me';

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
        login.request(
          { username, session, password: payload.newPassword },
          {
            onFailure: (_, errorPayload?: LoginErrorPayload) => {
              if (errorPayload) {
                errorCb(errorPayload);
              }
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
