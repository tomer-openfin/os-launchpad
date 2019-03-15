import { AnyAction } from 'redux';

import { AdminState } from './admin';
import { ApplicationState } from './application';
import { AppsState } from './apps';
import { ContextMenuState } from './contextMenu';
import { LayoutsState } from './layouts';
import { MeState } from './me';
import { OrganizationState } from './organization';
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
  contextMenu: ContextMenuState;
  layouts: LayoutsState;
  me: MeState;
  organization: OrganizationState;
  system: SystemState;
  windows: WindowsState;
}
