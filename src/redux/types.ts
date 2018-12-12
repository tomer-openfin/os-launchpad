import { AdminState } from './admin';
import { ApplicationState } from './application';
import { AppsState } from './apps';
import { ContextMenuState } from './contextMenu';
import { LayoutsState } from './layouts';
import { MeState } from './me';
import { OrganizationState } from './organization';
import { SystemState } from './system';
import { WindowsState } from './windows';

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
