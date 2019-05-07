import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { getLauncherPosition, getLauncherSizeConfig } from '../../redux/me';
import { getSystemDrawerSize } from '../../redux/selectors';
import { State } from '../../redux/types';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { getSystemIcons, SETTINGS_MENU_KEY, WORKSPACES_KEY } from '../../utils/getSystemIcons';

import { LAYOUTS_WINDOW, SETTINGS_MENU_WINDOW } from '../../config/windows';
import { getWindowIsShowing } from '../../redux/windows';
import SystemDrawer, { Props } from './SystemDrawer';

const mapState = (state: State) => {
  const launcherSizeConfig = getLauncherSizeConfig(state);
  const launcherPosition = getLauncherPosition(state);
  const icons = getSystemIcons();
  const size = getSystemDrawerSize(state);
  const activeIcons = {
    [WORKSPACES_KEY]: getWindowIsShowing(state, LAYOUTS_WINDOW),
    [SETTINGS_MENU_KEY]: getWindowIsShowing(state, SETTINGS_MENU_WINDOW),
  };

  return {
    activeIcons,
    extendedWindowPosition: getOppositeDirection(launcherPosition),
    icons,
    launcherSizeConfig,
    orientation: getLauncherOrientation(launcherPosition),
    size,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  dispatch: (action: Action) => dispatch(action),
});

const mergeProps = (stateProps, dispatchProps): Props => {
  const { icons: stateIcons, ...rest } = stateProps;
  const { dispatch, setExpanded } = dispatchProps;

  return {
    ...rest,
    icons: stateIcons.map(({ action, ...iconRest }) => ({
      cta: () => dispatch(action),
      ...iconRest,
    })),
  };
};

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(SystemDrawer);
