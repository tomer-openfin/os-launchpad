import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { LoginErrorPayload, loginRequest } from '../../redux/me';

import { Values } from './LoginForm';
import LoginFormik from './LoginFormik';

interface OwnProps {
  errorCb: (payload: LoginErrorPayload) => void;
}

interface MapDispatch {
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps: OwnProps): MapDispatch => ({
  handleSubmitValues: (payload: Values) => {
    const { errorCb } = ownProps;

    return new Promise(resolve => {
      dispatch(
        loginRequest(payload, {
          errorCb: error => {
            errorCb(error);
            resolve();
          },
        }),
      );
    });
  },
});

export default connect<null, MapDispatch, OwnProps>(
  null,
  mapDispatch,
)(LoginFormik);
