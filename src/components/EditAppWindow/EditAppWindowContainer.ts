import { connect } from 'react-redux';

import { App, MetaWithAsyncHandlers } from '../../types/commons';

import { updateAdminApp } from '../../redux/admin';
import { getAppById } from '../../redux/apps';
import { State } from '../../redux/types';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';

import EditAppWindow from './EditAppWindow';

const mapState = (state: State, ownProps) => ({
  app: getAppById(state, ownProps.appId),
});

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  onEscDown: ownProps.handleCancel,
  updateApp: (app: App, meta: MetaWithAsyncHandlers<App>) => dispatch(updateAdminApp.request(app, meta)),
});

export default connect(
  mapState,
  mapDispatch,
)(withEscapeKey(withResponseState(EditAppWindow)));
