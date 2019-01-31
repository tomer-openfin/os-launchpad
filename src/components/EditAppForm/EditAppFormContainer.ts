import { connect } from 'react-redux';

import { updateAdminAppRequest } from '../../redux/admin';
import { ROUTES } from '../Router/consts';

import withEscapeKey from '../../hocs/withEscapeKey';
import EditAppForm from './EditAppForm';

const mapDispatch = {
  updateApp: updateAdminAppRequest,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  onEscDown: () => {
    ownProps.history.push(ROUTES.ADMIN_APPS);
  },
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(EditAppForm));
