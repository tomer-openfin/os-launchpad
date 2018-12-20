import { Layout } from 'openfin-layouts/dist/client/types';
import { UserLayout } from '../types/commons';

export const MOCK_INTENTS = [
  {
    displayName: 'Start Call',
    name: 'StartCall',
  },
  {
    displayName: 'Start Chat',
    name: 'StartChat',
  },
  {
    displayName: 'View Chart',
    name: 'ViewChart',
  },
  {
    displayName: 'View Contact',
    name: 'ViewContact',
  },
  {
    displayName: 'View Quote',
    name: 'ViewQuote',
  },
  // {
  //   displayName: 'View News',
  //   name: 'ViewNews',
  // },
  // {
  //   displayName: 'View Instrument',
  //   name: 'ViewInstrument',
  // },
  // {
  //   displayName: 'View Analysis',
  //   name: 'ViewAnalysis',
  // },
];

export const MOCK_CONTEXTS = [
  {
    $type: 'Instrument',
    id: {
      CUSIP: '037833100',
      FIGI: 'BBG000B9XRY4',
      ISIN: 'US0378331005',
      ticker: 'aapl',
    },
    name: 'Apple',
  },
  {
    $type: 'Contact',
    id: {
      email: 'nick@openfin.co',
      phone: '9171234567',
      twitter: 'nkolba',
    },
    name: 'Nick Kolba',
  },
  {
    $type: 'Organization',
    id: {
      LEI: 'VGRQXHF3J8VDLUA7XE92',
      PERMID: '4295904307',
    },
    name: 'IBM',
  },
  {
    $type: 'Contact List',
    contacts: [
      {
        $type: 'contact',
        id: {
          email: 'nick@openfin.co',
        },
        name: 'Nick Kolba',
      },
      {
        $type: '$contact',
        id: {
          email: 'espen@openfin.co',
        },
        name: 'Espen Overbye',
      },
    ],
  },
  {
    $type: 'Position',
    holding: 500,
    instrument: {
      $type: 'instrument',
      id: {
        ISIN: 'US0378331005',
      },
      name: 'Apple',
    },
  },
];

export const exampleLayout: Layout = {
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
      deviceScaleFactor: '1',
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
      name: '\\\\.\\DISPLAY1',
    },
    reason: 'api-query',
    taskbar: {
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
  tabGroups: [],
  type: 'layout',
};

export const exampleUserLayout: UserLayout = {
  id: 'layout',
  layout: exampleLayout,
  name: 'layout',
};
