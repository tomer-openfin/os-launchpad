import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setLauncherMonitorSettings } from '../../redux/me';
import { getActiveLauncherMonitorId } from '../../redux/selectors';
import { State } from '../../redux/types';
import { MonitorDetails } from '../../types/fin';

import { getMonitorDetailsById } from '../../redux/system';

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

const mergeProps = ({ activeId, monitorDetailsById }: MapState, { handleClick }: MapDispatch, ownProps: Props) => ({
  ...ownProps,
  activeId,
  handleClick: (id: string | number) => {
    const monitorDetails = monitorDetailsById[id];
    if (!monitorDetails) {
      return;
    }

    handleClick(monitorDetails);
  },
});

const mapLauncherDispatch = (dispatch: Dispatch): MapDispatch => ({
  handleClick: (monitorDetails: MonitorDetails) => dispatch(setLauncherMonitorSettings(monitorDetails)),
});

export const withLauncherConfig = connect<MapState, MapDispatch, Props, MergeProps, State>(
  mapState,
  mapLauncherDispatch,
  mergeProps,
);

export const asRoute = (Component: React.ComponentType<Props>) => () => {
  return <Component gutterSize={7} height={240} title="Set Launcher Screen" width={380} />;
};
