import { Workspace, WorkspaceApp } from '../types/commons';
import { isStorybookEnv, isTestEnv } from './processHelpers';

const isNotFin = isTestEnv() || isStorybookEnv();

enum OpenfinLayout {
  type = 'workspace',
}

const mockWorkspace = {
  apps: [],
  monitorInfo: {
    deviceScaleFactor: 0,
    dpi: { x: 0, y: 0 },
    nonPrimaryMonitors: [],
    primaryMonitor: {
      available: {
        dipRect: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        scaledRect: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      },
      availableRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      deviceId: '',
      deviceScaleFactor: 0,
      displayDeviceActive: false,
      dpi: { x: 0, y: 0 },
      monitor: {
        dipRect: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
        scaledRect: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      },
      monitorRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      name: 0,
    },
    reason: '',
    taskBar: {
      dipRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      edge: 'bottom',
      rect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      scaledRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    },
    virtualScreen: {
      bottom: 0,
      dipRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      left: 0,
      right: 0,
      scaledRect: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      top: 0,
    },
  },
  schemaVersion: '',
  tabGroups: [],
  type: OpenfinLayout.type,
};

const mockDeregister = () => Promise.resolve(undefined);
const mockReady = (): Promise<Workspace> => Promise.resolve(mockWorkspace);
const mockGenerateWorkspace = (): Promise<Workspace> => Promise.resolve(mockWorkspace);
const mockRestoreWorkspace = (workspaceArg: Workspace): Promise<Workspace> => Promise.resolve(workspaceArg);
const mockSetGenerateHandler = (customDataDecorator: () => {} | null | undefined): Promise<boolean> => Promise.resolve(true);
const mockSetRestoreHandler = (listener: (workspaceApp: Workspace) => Workspace | false | Promise<Workspace | false>): Promise<boolean> =>
  Promise.resolve(true);

const mockWorkspaces = {
  generate: mockGenerateWorkspace,
  ready: mockReady,
  restore: mockRestoreWorkspace,
  setGenerateHandler: mockSetGenerateHandler,
  setRestoreHandler: mockSetRestoreHandler,
};

interface WorkspacesLib {
  generate: () => Promise<Workspace>;
  ready: () => Promise<Workspace>;
  restore: (workspaceArg: Workspace) => Promise<Workspace>;
  setGenerateHandler: (customDataDecorator: () => {} | null | undefined) => Promise<boolean>;
  setRestoreHandler: (listener: (workspaceApp: WorkspaceApp) => WorkspaceApp | false | Promise<WorkspaceApp | false>) => Promise<boolean>;
}

/**
 * The reason for this file is because when openfin-layouts is imported
 * it does setup speficially for openfin applications with window.fin available.
 * This will break the testing suites and storybook, so as a result,
 * only import the openfin-layouts lib when in an openfin environment
 */
// tslint:disable-next-line:no-var-requires
const workspaces: WorkspacesLib = isNotFin ? mockWorkspaces : require('openfin-layouts').workspaces;
// tslint:disable-next-line:no-var-requires
export const generateLayout = workspaces.generate;
// tslint:disable-next-line:no-var-requires
export const restoreLayout = workspaces.restore;
// tslint:disable-next-line:no-var-requires
export const deregister = isNotFin ? mockDeregister : require('openfin-layouts').deregister;
export const setGenerateHandler = workspaces.setGenerateHandler;
export const setRestoreHandler = workspaces.setRestoreHandler;
export const ready = workspaces.ready;
