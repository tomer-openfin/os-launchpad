import { connect } from 'react-redux';

import { getDrawerIsExpanded, setIsDragAndDrop } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig, saveSettingsRequest, setAppIds } from '../../redux/me';
import { getAppListApps, getAppListDimensions } from '../../redux/selectors';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import AppList from './AppList';

const mapState = (state, { isOverflowExpanded = false }) => {
  let { height, width } = getAppListDimensions(state);
  const launcherSizeConfig = getLauncherSizeConfig(state);
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
    height: isOnTopOrBottom && !isOverflowExpanded ? launcherSizeConfig.launcher : height,
    launcherPosition,
    launcherSizeConfig,
    toggleIndex: getAppListApps(state).toggleIndex,
    width: !isOnTopOrBottom && !isOverflowExpanded ? launcherSizeConfig.launcher : width,
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
