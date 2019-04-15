import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setLauncherMonitorSettings } from '../../redux/me';
import { getActiveLauncherMonitorId } from '../../redux/selectors';
import { getMonitorDetailsById } from '../../redux/system';
import { State } from '../../redux/types';
import { MonitorDetails } from '../../types/fin';
import { EventType, sendAnalytics } from '../../utils/analytics';

import { Props } from './MonitorControlsDialog';

interface MonitorDetailsWithId {
  [id: number]: MonitorDetails;
  [id: string]: MonitorDetails;
}

interface MapDispatch {
  handleClick: (monitorDetails: MonitorDetails) => void;
}

interface MapState {
  activeId?: number | string | null;
  monitorDetailsById: MonitorDetailsWithId;
}

interface MergeProps {
  activeId?: number | string | null;
  handleClick: (id: string | number) => void;
}

const mapState = (state: State): MapState => ({
  activeId: getActiveLauncherMonitorId(state),
  monitorDetailsById: getMonitorDetailsById(state),
});

const mapDispatch = (dispatch: Dispatch): MapDispatch => ({
  handleClick: (monitorDetails: MonitorDetails) => dispatch(setLauncherMonitorSettings(monitorDetails)),
});

const mergeProps = ({ activeId, monitorDetailsById }: MapState, { handleClick }: MapDispatch, ownProps: Props) => ({
  ...ownProps,
  activeId,
  handleClick: (id: string | number) => {
    const monitorDetails = monitorDetailsById[id];
    if (!monitorDetails) {
      return;
    }

    sendAnalytics({ type: EventType.Click, label: 'MonitorLocation', context: { monitorDetails } });
    handleClick(monitorDetails);
  },
});

export const withLauncherConfig = connect<MapState, MapDispatch, Props, MergeProps, State>(
  mapState,
  mapDispatch,
  mergeProps,
);

export const asRoute = (Component: React.ComponentType<Props>) => () => {
  return <Component gutterSize={7} height={240} title="Set Launcher Screen" width={380} />;
};
