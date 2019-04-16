import { connect } from 'react-redux';

import { getAppStatusStateById, launchApp } from '../../redux/apps';
import { App, AppStatusStates } from '../../types/commons';
import { EventType, sendAnalytics } from '../../utils/analytics';

import AppCard, { Props } from './AppCard';

const mapState = (state, { app }: Props) => ({
  isLoading: getAppStatusStateById(state, app.id) === AppStatusStates.Loading,
});

const mapDispatch = dispatch => ({
  launchApp: (app: App) => {
    sendAnalytics({ type: EventType.Click, label: 'AppCard', context: { name: app.name } }, { includeAppList: true, includeFinWindows: true });
    dispatch(launchApp(app));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(AppCard);
