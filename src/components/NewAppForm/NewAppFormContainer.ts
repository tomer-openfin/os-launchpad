import { connect } from 'react-redux';

import { App } from '../../types/commons';

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
  pushRoute: (route: string, item?: App): void => ownProps.history.push(route, item),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(NewAppForm));
