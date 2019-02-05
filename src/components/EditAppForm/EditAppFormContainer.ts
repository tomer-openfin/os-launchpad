import { connect } from 'react-redux';

import { App } from '../../types/commons';

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
  app: ownProps.location.state,
  onEscDown: () => {
    ownProps.history.push(ROUTES.ADMIN_APPS);
  },
  pushRoute: (route: string, item?: App): void => ownProps.history.push(route, item),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(EditAppForm));
