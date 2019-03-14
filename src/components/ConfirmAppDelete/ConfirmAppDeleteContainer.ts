import { connect } from 'react-redux';

import { deleteAdminApp, getAdminAppFromId } from '../../redux/admin';
import { State } from '../../redux/types';

import ConfirmAppDelete from './ConfirmAppDelete';

const mapState = (state: State, ownProps) => ({
  app: getAdminAppFromId(state, ownProps.appId),
});

const mapDispatch = {
  deleteApp: deleteAdminApp.request,
};

export default connect(
  mapState,
  mapDispatch,
)(ConfirmAppDelete);
