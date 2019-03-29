import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sendBug, SendBugRequestPayload } from '../../redux/support';
import BugFormik from './BugFormik';

interface MapDispatch {
  handleSubmitValues: (payload: SendBugRequestPayload['feedback']) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps): MapDispatch => ({
  handleSubmitValues: (payload: SendBugRequestPayload['feedback']) => {
    const { handleError, handleSuccess } = ownProps;

    return new Promise(resolve => {
      dispatch(
        sendBug.request(payload, {
          onFailure: () => {
            handleError();
            resolve();
          },
          onSuccess: () => {
            handleSuccess();
            resolve();
          },
        }),
      );
    });
  },
});

export default connect<null, MapDispatch>(
  null,
  mapDispatch,
)(BugFormik);
