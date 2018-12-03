import { connect } from 'react-redux';

import { updateAdminAppRequest } from '../../redux/admin/index';
import EditAppForm from './EditAppForm';

const dispatchProps = {
  updateApp: updateAdminAppRequest,
};

export default connect(
  null,
  dispatchProps,
)(EditAppForm);
