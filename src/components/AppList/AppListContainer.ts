import { connect } from 'react-redux';

import { setIsDragAndDrop } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig, saveSettings, setAppIds } from '../../redux/me';
import { getAppListApps, getAppListDimensions } from '../../redux/selectors';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import { Dispatch } from 'redux';
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
    height: isOnTopOrBottom && !isOverflowExpanded ? launcherSizeConfig.launcher : height,
    launcherPosition,
    launcherSizeConfig,
    toggleIndex: getAppListApps(state).toggleIndex,
    width: !isOnTopOrBottom && !isOverflowExpanded ? launcherSizeConfig.launcher : width,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  saveSettings: () => dispatch(saveSettings.request()),
  setAppIds: (appIds: string[]) => dispatch(setAppIds({ appIds })),
  setIsDragAndDrop: (isDragAndDroppable: boolean) => dispatch(setIsDragAndDrop(isDragAndDroppable)),
});

export default connect(
  mapState,
  mapDispatch,
)(AppList);
