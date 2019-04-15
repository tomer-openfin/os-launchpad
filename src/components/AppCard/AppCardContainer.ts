import { connect } from 'react-redux';

import { getAppStatusStateById, openFinApp } from '../../redux/apps';
import { App, AppStatusStates } from '../../types/commons';
import { EventType, sendAnalytics } from '../../utils/analytics';

import AppCard, { Props } from './AppCard';

const mapState = (state, { app }: Props) => ({
  isLoading: getAppStatusStateById(state, app.id) === AppStatusStates.Loading,
});

const mapDispatch = dispatch => ({
  launchApp: (app: App) => {
    sendAnalytics({ type: EventType.Click, label: 'AppCard', context: { name: app.name } }, { includeAppList: true, includeFinWindows: true });
    dispatch(openFinApp.request(app));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(AppCard);
