import { connect } from 'react-redux';

import { AppStatusStates, closeFinAppRequest, getAppById, getAppStatusByName, openFinAppRequest } from '../../redux/apps';
import { getLauncherPosition, removeFromAppLauncher } from '../../redux/me';
import { AppIconSizes, DirectionalPosition } from '../../types/enums';

import AppIcon from './AppIcon';

const invertPosition = (position: DirectionalPosition): DirectionalPosition => {
  switch (position) {
    case DirectionalPosition.Top: {
      return DirectionalPosition.Bottom;
    }
    case DirectionalPosition.Right: {
      return DirectionalPosition.Left;
    }
    case DirectionalPosition.Bottom: {
      return DirectionalPosition.Top;
    }
    case DirectionalPosition.Left: {
      return DirectionalPosition.Right;
    }
    default: {
      return DirectionalPosition.Bottom;
    }
  }
};

interface Props {
  name: string;
  size?: AppIconSizes;
  withContextMenu?: boolean;
}

const mapState = (state, { name }) => ({
  app: getAppById(state, name),
  launcherPosition: getLauncherPosition(state),
  status: getAppStatusByName(state, name),
});

const mapDispatch = {
  openFinAppRequest,
};

const mergeProps = (stateProps, dispatchProps, ownProps: Props) => {
  const { app, launcherPosition, status } = stateProps;
  const { name, withContextMenu } = ownProps;

  let contextMenuOptions;
  if (withContextMenu) {
    contextMenuOptions = [{ label: 'Remove Shortcut', action: removeFromAppLauncher(`${name}`) }];
    if ((!status || status.state === AppStatusStates.Closed) && app) {
      contextMenuOptions.unshift({ label: 'Open', action: openFinAppRequest(app) });
    }
    if (status && status.state === AppStatusStates.Running && status.uuid) {
      contextMenuOptions.unshift({ label: 'Close', action: closeFinAppRequest({ uuid: status.uuid }) });
    }
  }

  return {
    ...ownProps,
    contextMenuOptions,
    imgSrc: stateProps.app ? stateProps.app.icon : '',
    indicatorPosition: invertPosition(launcherPosition),
    launchApp: app ? () => dispatchProps.openFinAppRequest(app) : () => undefined,
  };
};

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(AppIcon);
