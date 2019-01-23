import { connect } from 'react-redux';

import { closeFinAppRequest, getAppById, getAppStatusById, openFinAppRequest } from '../../redux/apps';
import { getLauncherPosition, getLauncherSizeConfig, removeFromAppLauncher } from '../../redux/me';
import { AppStatusStates } from '../../types/commons';

import LauncherAppIcon from './LauncherAppIcon';

interface Props {
  appId: string;
  size?: number;
  withContextMenu?: boolean;
}

const mapState = (state, { appId }) => ({
  app: getAppById(state, appId),
  launcherPosition: getLauncherPosition(state),
  launcherSizeConfig: getLauncherSizeConfig(state),
  status: getAppStatusById(state, appId),
});

const mapDispatch = {
  openFinAppRequest,
};

const mergeProps = (stateProps, dispatchProps, ownProps: Props) => {
  const { app, launcherPosition, launcherSizeConfig, status } = stateProps;
  const { appId, withContextMenu } = ownProps;

  let contextMenuOptions;
  if (withContextMenu) {
    contextMenuOptions = [{ label: 'Remove Shortcut', action: removeFromAppLauncher(`${appId}`) }];
    if ((!status || status.state === AppStatusStates.Closed) && app) {
      contextMenuOptions.unshift({ label: 'Open', action: openFinAppRequest(app) });
    }
    if (status && status.state === AppStatusStates.Running && status.uuid) {
      contextMenuOptions.unshift({ label: 'Close', action: closeFinAppRequest({ uuid: status.uuid }) });
    }
  }

  return {
    ...ownProps,
    appStatusState: status ? status.state : AppStatusStates.Closed,
    appTitle: app ? app.title : '',
    contextMenuOptions,
    imgSrc: app ? app.icon : '',
    launchApp: app ? () => dispatchProps.openFinAppRequest(app) : () => undefined,
    launcherPosition,
    launcherSizeConfig,
  };
};

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(LauncherAppIcon);
