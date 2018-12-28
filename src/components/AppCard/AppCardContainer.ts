import { connect } from 'react-redux';

import { openFinAppRequest } from '../../redux/apps';
import { App } from '../../types/commons';

import AppCard from './AppCard';

const dispatchProps = dispatch => ({
  launchApp: (app: App) => dispatch(openFinAppRequest(app)),
});

export default connect(
  null,
  dispatchProps,
)(AppCard);
