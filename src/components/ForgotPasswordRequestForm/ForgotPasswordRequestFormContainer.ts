import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { forgotPasswordRequest } from '../../redux/me';

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
        forgotPasswordRequest(payload, {
          errorCb: error => {
            errorCb(error);
            resolve();
          },
          successCb: () => {
            successCb(payload);
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
