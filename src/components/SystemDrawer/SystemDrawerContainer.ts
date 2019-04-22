import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig, getSystemTrayEnabled } from '../../redux/me';
import { getSystemDrawerSize, getSystemIconsSelector } from '../../redux/selectors';
import { State } from '../../redux/types';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { LOGOUT_KEY, WORKSPACES_KEY } from '../../utils/getSystemIcons';

import { LAYOUTS_WINDOW, LOGOUT_WINDOW } from '../../config/windows';
import { getWindowIsShowing } from '../../redux/windows';
import SystemDrawer, { Props } from './SystemDrawer';

const mapState = (state: State) => {
  const launcherSizeConfig = getLauncherSizeConfig(state);
  const isExpanded = getDrawerIsExpanded(state);
  const launcherPosition = getLauncherPosition(state);
  const icons = getSystemIconsSelector(state);
  const size = getSystemDrawerSize(state);
  const activeIcons = { [LOGOUT_KEY]: getWindowIsShowing(state, LOGOUT_WINDOW), [WORKSPACES_KEY]: getWindowIsShowing(state, LAYOUTS_WINDOW) };
  const hasMinimizeToSystemTray = getSystemTrayEnabled(state);

  return {
    activeIcons,
    extendedWindowPosition: getOppositeDirection(launcherPosition),
    hasMinimizeToSystemTray,
    icons,
    isExpanded,
    launcherSizeConfig,
    orientation: getLauncherOrientation(launcherPosition),
    size,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  dispatch: (action: Action) => dispatch(action),
  setExpanded: (isExpanded: boolean) => dispatch(setIsDrawerExpanded(isExpanded)),
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
    onClickToggle: (isExpanded?: boolean) => (typeof isExpanded !== 'boolean' ? setExpanded(!rest.isExpanded) : setExpanded(isExpanded)),
  };
};

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(SystemDrawer);
