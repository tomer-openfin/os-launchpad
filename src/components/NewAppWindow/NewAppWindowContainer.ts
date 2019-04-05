import { connect } from 'react-redux';

import { App, MetaWithAsyncHandlers } from '../../types/commons';

import { createAdminApp } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';

import NewAppWindow from './NewAppWindow';

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  createApp: (app: App, meta: MetaWithAsyncHandlers<App>) => dispatch(createAdminApp.request(app, meta)),
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
)(withEscapeKey(withResponseState(NewAppWindow)));
