import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { addToAppLauncher, getAppsDirectoryAppList, getAppsLauncherIds, removeFromAppLauncher } from '../../redux/apps';

import { APP_DIRECTORY_WINDOW } from '../../config/windows';
import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
  launcherAppIds: getAppsLauncherIds(state),
});

/* tslint:disable:no-console */
const dispatchProps = dispatch => {
  const listener = () => {
    console.log('BLUR', '\n');
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  };
  return {
    addHideOnBlurListener: () =>
      dispatch(Window.addWindowEventListener({ id: APP_DIRECTORY_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e))),
    removeHideOnBlurListener: () =>
      dispatch(Window.removeWindowEventListener({ id: APP_DIRECTORY_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e))),
  };
};

export default connect(
  stateProps,
  dispatchProps,
)(AppDirectory);
