import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Values } from './BugForm';
import BugFormik from './BugFormik';

interface MapDispatch {
  handleSubmitValues: (payload: Values) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps): MapDispatch => ({
  handleSubmitValues: (payload: Values) => {
    return new Promise(resolve => {
      // TODO: sendBugReport.request({ <payload here>})
      // dispatch(sendBugReport.request());
      resolve();
    });
  },
});

export default connect<null, MapDispatch>(
  null,
  mapDispatch,
)(BugFormik);
