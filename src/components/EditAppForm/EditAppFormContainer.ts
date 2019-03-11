import { connect } from 'react-redux';

import { updateAdminAppRequest } from '../../redux/admin';
import { getAppById } from '../../redux/apps';
import { State } from '../../redux/types';

import withEscapeKey from '../../hocs/withEscapeKey';
import EditAppForm from './EditAppForm';

const mapState = (state: State, ownProps) => ({
  app: getAppById(state, ownProps.appId),
});

const mapDispatch = {
  updateApp: updateAdminAppRequest,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onEscDown: ownProps.handleCancel,
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(withEscapeKey(EditAppForm));
