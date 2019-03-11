import { connect } from 'react-redux';

import { deleteAdminAppRequest } from '../../redux/admin';
import { getAppById } from '../../redux/apps';
import { State } from '../../redux/types';

import ConfirmAppDelete from './ConfirmAppDelete';

const mapState = (state: State, ownProps) => ({
  app: getAppById(state, ownProps.id),
});

const mapDispatch = {
  deleteApp: deleteAdminAppRequest,
};

export default connect(
  mapState,
  mapDispatch,
)(ConfirmAppDelete);
