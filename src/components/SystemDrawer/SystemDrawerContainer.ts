import { connect } from 'react-redux';
import { Action } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition } from '../../redux/me';
import { getSystemIconsSelector } from '../../redux/selectors';
import { State } from '../../redux/types';
import { getLauncherOrientation, getOppositeDirection } from '../../utils/directionalPositionHelpers';
import { calcSystemDrawerSize } from './utils';

import SystemDrawer from './SystemDrawer';

const mapState = (state: State) => {
  const isExpanded = getDrawerIsExpanded(state);
  const launcherPosition = getLauncherPosition(state);
  const icons = getSystemIconsSelector(state);
  const size = calcSystemDrawerSize(icons, isExpanded);

  return {
    extendedWindowPosition: getOppositeDirection(launcherPosition),
    icons,
    isExpanded,
    orientation: getLauncherOrientation(launcherPosition),
    size,
  };
};

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
  setExpanded: (isExpanded: boolean) => dispatch(setIsDrawerExpanded(isExpanded)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
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
