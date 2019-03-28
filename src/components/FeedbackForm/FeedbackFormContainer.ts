import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sendFeedback, SendFeedbackRequestPayload } from '../../redux/support/index';

import FeedbackFormik from './FeedbackFormik';

interface MapDispatch {
  handleSubmitValues: (payload: SendFeedbackRequestPayload['feedback']) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps): MapDispatch => ({
  handleSubmitValues: (payload: SendFeedbackRequestPayload['feedback']) => {
    const { handleError, handleSuccess } = ownProps;

    return new Promise(resolve => {
      dispatch(sendFeedback.request(payload, { onSuccess: handleSuccess, onFailure: handleError }));
      resolve();
    });
  },
});

export default connect<null, MapDispatch>(
  null,
  mapDispatch,
)(FeedbackFormik);
