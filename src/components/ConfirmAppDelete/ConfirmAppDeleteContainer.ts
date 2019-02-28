import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { App } from '../../types/commons';

import { deleteAdminAppRequest } from '../../redux/admin';

import ConfirmAppDelete from './ConfirmAppDelete';

const mapDispatch = {
  deleteApp: deleteAdminAppRequest,
};

const mergeProps = (_, dispatchProps, ownProps: RouteComponentProps) => ({
  ...dispatchProps,
  ...ownProps,
  app: ownProps.location.state,
  pushRoute: (route: string, item?: App): void => ownProps.history.push(route, item),
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(ConfirmAppDelete);
