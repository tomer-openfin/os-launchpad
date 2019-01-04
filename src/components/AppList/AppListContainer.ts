import { connect } from 'react-redux';

import { getDrawerIsExpanded, setIsDragAndDrop } from '../../redux/application';
import { getLauncherPosition, saveSettingsRequest, setAppIds } from '../../redux/me';
import { getAppListApps, getAppListDimensions } from '../../redux/selectors';
import * as SIZE from '../../utils/sizingConstants';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import AppList from './AppList';

const mapState = (state, { isOverflowExpanded = false }) => {
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
    appList: getAppListApps(state).appIds,
    areAppsDisabled: getDrawerIsExpanded(state),
    height: isOnTopOrBottom && !isOverflowExpanded ? SIZE.LOGO : height,
    launcherPosition,
    toggleIndex: getAppListApps(state).toggleIndex,
    width: !isOnTopOrBottom && !isOverflowExpanded ? SIZE.LOGO : width,
  };
};

const mapDispatch = {
  saveSettings: saveSettingsRequest,
  setAppIds,
  setIsDragAndDrop,
};

export default connect(
  mapState,
  mapDispatch,
)(AppList);
