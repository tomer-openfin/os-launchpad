import { connect } from 'react-redux';

import { App, MetaWithCallbacks } from '../../types/commons';

import { createAdminAppRequest } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import withResponseState from '../../hocs/withResponseState';

import NewAppWindow from './NewAppWindow';

const mapDispatch = (dispatch, ownProps) => ({
  ...ownProps,
  createApp: (app: App, meta: MetaWithCallbacks) => dispatch(createAdminAppRequest(app, meta)),
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
)(withEscapeKey(withResponseState(NewAppWindow)));
