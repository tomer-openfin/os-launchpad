import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Values } from './FeedbackForm';
import FeedbackFormik from './FeedbackFormik';

interface MapDispatch {
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps): MapDispatch => ({
  handleSubmitValues: (payload: Values) => {
    return new Promise(resolve => {
      // TODO: sendProductFeedback.request({ <payload here>})
      // dispatch(sendProductFeedback.request());
      resolve();
    });
  },
});

export default connect<null, MapDispatch>(
  null,
  mapDispatch,
)(FeedbackFormik);
