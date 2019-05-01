import { AnyAction } from 'redux';

import { AdminState } from './admin';
import { ApplicationState } from './application';
import { AppsState } from './apps';
import { ChannelsState } from './channels/types';
import { ContextMenuState } from './contextMenu';
import { LayoutsState } from './layouts';
import { MeState } from './me';
import { OrganizationState } from './organization';
import { SnapshotState } from './snapshot/types';
import { SystemState } from './system';
import { WindowsState } from './windows';

// tslint:disable-next-line:no-any
export type ActionCreator = (...args: any[]) => AnyAction;
interface ActionCreatorsMapObject {
  [actionCreator: string]: ActionCreator;
}
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export interface State {
  admin: AdminState;
  apps: AppsState;
  application: ApplicationState;
  channels: ChannelsState;
  contextMenu: ContextMenuState;
  layouts: LayoutsState;
  me: MeState;
  organization: OrganizationState;
  snapshot: SnapshotState;
  system: SystemState;
  windows: WindowsState;
}
