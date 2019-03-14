import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { forgotPassword } from '../../redux/me';

import { Values } from './ForgotPasswordRequestForm';
import ForgotPasswordRequestFormik from './ForgotPasswordRequestFormik';

interface OwnProps {
  successCb: (payload?: { username: string }) => void;
  errorCb: (message: string) => void;
}

interface MapDispatch {
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps: OwnProps): MapDispatch => ({
  handleSubmitValues: (payload: Values) => {
    const { errorCb, successCb } = ownProps;

    return new Promise(resolve => {
      dispatch(
        forgotPassword.request(payload, {
          onFailure: error => {
            errorCb(error ? error.message : 'Unknown error');
            resolve();
          },
          onSuccess: () => {
            successCb(payload);
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
)(ForgotPasswordRequestFormik);
