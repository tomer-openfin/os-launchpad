import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { SETTINGS_WINDOW } from '../../config/windows';
import { getAutoHide, setAutoHide, setLaunchbarPosition } from '../../redux/me';
import Settings from './Settings';

const stateProps = state => ({
  autoHide: getAutoHide(state),
});

/* tslint:disable:no-console */
const dispatchProps = dispatch => {
  const listener = () => {
    console.log('BLUR', '\n');
    dispatch(Window.hideWindow({ id: SETTINGS_WINDOW }));
  };
  return {
    addHideOnBlurListener: () =>
      dispatch(Window.addWindowEventListener({ id: SETTINGS_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e))),
    removeHideOnBlurListener: () =>
      dispatch(Window.removeWindowEventListener({ id: SETTINGS_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e))),
    setAutoHide: (bool: boolean) => dispatch(setAutoHide({ autoHide: bool })),
    setLaunchbarPosition: (launcherPosition: 'TOP' | 'RIGHT' | 'LEFT' | 'BOTTOM') => dispatch(setLaunchbarPosition(launcherPosition)),
  };
};

export default connect(
  stateProps,
  dispatchProps,
)(Settings);
