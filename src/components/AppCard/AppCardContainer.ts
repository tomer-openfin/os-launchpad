import { connect } from 'react-redux';

import { getAppStatusStateById, openFinAppRequest } from '../../redux/apps';
import { App, AppStatusStates } from '../../types/commons';

import AppCard, { Props } from './AppCard';

const mapState = (state, { app }: Props) => ({
  isLoading: getAppStatusStateById(state, app.id) === AppStatusStates.Loading,
});

const mapDispatch = dispatch => ({
  launchApp: (app: App) => dispatch(openFinAppRequest(app)),
});

export default connect(
  mapState,
  mapDispatch,
)(AppCard);
