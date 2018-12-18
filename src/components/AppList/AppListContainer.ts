import { connect } from 'react-redux';

import { getDrawerIsExpanded } from '../../redux/application';
import { getLauncherPosition } from '../../redux/me';
import { getAppListApps, getAppListDimensions } from '../../redux/selectors';
import * as SIZE from '../../utils/sizingConstants';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import AppList from './AppList';

const stateProps = (state, { isOverflowExpanded = false }) => {
  let { height, width } = getAppListDimensions(state);
  const launcherPosition = getLauncherPosition(state);
  const isOnTopOrBottom = isTopOrBottom(launcherPosition);
  if (!isOnTopOrBottom) {
    height = isOverflowExpanded ? height : 0;
  }
  if (isOnTopOrBottom) {
    width = isOverflowExpanded ? width : 0;
  }

  return {
    appList: getAppListApps(state),
    areAppsDisabled: getDrawerIsExpanded(state),
    height: isOnTopOrBottom && !isOverflowExpanded ? SIZE.LOGO : height,
    launcherPosition,
    width: !isOnTopOrBottom && !isOverflowExpanded ? SIZE.LOGO : width,
  };
};

export default connect(stateProps)(AppList);
