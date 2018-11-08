import { ApplicationState } from './application';
import { AppsState } from './apps';
import { LayoutsState } from './layouts';
import { MeState } from './me';
import { SystemState } from './system';

export interface Bounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface Windows {
  byId: {
    [id: string]: {
      bounds: Bounds;
      id: string;
    };
  };
  ids: string[];
}

export interface State {
  apps: AppsState;
  application: ApplicationState;
  layouts: LayoutsState;
  me: MeState;
  system: SystemState;
  // TODO: either type out or add into redux-openfin package
  windows: Windows;
}
