import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { getAppsDirectoryAppList, getAppsLauncherIds } from '../../redux/apps';

import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
  launcherAppIds: getAppsLauncherIds(state),
});

/* tslint:disable:no-console */
const dispatchProps = dispatch => {
  return {
    addWindowListener: (id, type, listener) =>
      dispatch(Window.addWindowEventListener({ id, type, listener }, () => console.log('HERE'), e => console.error(e))),
    hideWindow: id => {
      console.log('BLUR', '\n');
      dispatch(Window.hideWindow({ id }));
    },
    removeWindowListener: (id, type, listener) =>
      dispatch(Window.removeWindowEventListener({ id, type, listener }, () => console.log('HERE'), e => console.error(e))),
  };
};

export default connect(
  stateProps,
  dispatchProps,
)(AppDirectory);
