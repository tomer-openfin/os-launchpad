import { Bounds } from '../types/commons';

import { AdminState } from './admin';
import { ApplicationState } from './application';
import { AppsState } from './apps';
import { LayoutsState } from './layouts';
import { MeState } from './me';
import { OrganizationState } from './organization';
import { SystemState } from './system';

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
  admin: AdminState;
  apps: AppsState;
  application: ApplicationState;
  layouts: LayoutsState;
  me: MeState;
  organization: OrganizationState;
  system: SystemState;
  // TODO: either type out or add into redux-openfin package
  windows: Windows;
}
