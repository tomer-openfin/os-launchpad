import { UserLayout, Workspace } from '../types/commons';

export const exampleLayout: Workspace = {
  apps: [],
  monitorInfo: {
    deviceScaleFactor: 1,
    dpi: {
      x: 96,
      y: 96,
    },
    nonPrimaryMonitors: [],
    primaryMonitor: {
      available: {
        dipRect: {
          bottom: 1400,
          left: 0,
          right: 3440,
          top: 0,
        },
        scaledRect: {
          bottom: 1400,
          left: 0,
          right: 3440,
          top: 0,
        },
      },
      availableRect: {
        bottom: 1400,
        left: 0,
        right: 3440,
        top: 0,
      },
      deviceId: '\\\\?\\DISPLAY#Default_Monitor#4&10c2e2d6&0&UID0#{e6f07b5f-ee97-4a90-b076-33f57bf4eaa7}',
      deviceScaleFactor: 0,
      displayDeviceActive: true,
      dpi: {
        x: 96,
        y: 96,
      },
      monitor: {
        dipRect: {
          bottom: 1440,
          left: 0,
          right: 3440,
          top: 0,
        },
        scaledRect: {
          bottom: 1440,
          left: 0,
          right: 3440,
          top: 0,
        },
      },
      monitorRect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 0,
      },
      name: 0,
    },
    reason: 'api-query',
    taskBar: {
      dipRect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 1400,
      },
      edge: 'bottom',
      rect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 1400,
      },
      scaledRect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 1400,
      },
    },
    virtualScreen: {
      bottom: 1440,
      dipRect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 0,
      },
      left: 0,
      right: 3440,
      scaledRect: {
        bottom: 1440,
        left: 0,
        right: 3440,
        top: 0,
      },
      top: 0,
    },
  },
  schemaVersion: '',
  tabGroups: [],
  type: 'workspace',
};

export const exampleUserLayout: UserLayout = {
  id: 'layout',
  layout: exampleLayout,
  name: 'layout',
};

export const exampleUserLayouts: UserLayout[] = [
  {
    id: 'layout1',
    layout: exampleLayout,
    name: 'layout1',
  },
  {
    id: 'layout2',
    layout: exampleLayout,
    name: 'layout2',
  },
  {
    id: 'layout3',
    layout: exampleLayout,
    name: 'layout3',
  },
];
