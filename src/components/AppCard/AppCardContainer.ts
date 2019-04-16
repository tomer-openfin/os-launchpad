import { connect } from 'react-redux';

import { getAppStatusStateById, launchApp } from '../../redux/apps';
import { App, AppStatusStates } from '../../types/commons';

import AppCard, { Props } from './AppCard';

const mapState = (state, { app }: Props) => ({
  isLoading: getAppStatusStateById(state, app.id) === AppStatusStates.Loading,
});

const mapDispatch = dispatch => ({
  launchApp: (app: App) => dispatch(launchApp(app)),
});

export default connect(
  mapState,
  mapDispatch,
)(AppCard);
