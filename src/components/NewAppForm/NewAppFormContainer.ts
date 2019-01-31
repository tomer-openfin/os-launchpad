import { connect } from 'react-redux';

import { createAdminAppRequest } from '../../redux/admin';
import { ROUTES } from '../Router/consts';

import withEscapeKey from '../../hocs/withEscapeKey';
import NewAppForm from './NewAppForm';

const mapDispatch = {
  createApp: createAdminAppRequest,
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
)(withEscapeKey(NewAppForm));
