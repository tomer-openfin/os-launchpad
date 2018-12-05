import { Layout } from 'openfin-layouts/dist/client/types';
import { UserLayout } from '../types/commons';

export const MOCK_INTENTS = [
  {
    displayName: 'Call',
    name: 'StartCall',
  },
  {
    displayName: 'Chat',
    name: 'StartChat',
  },
  {
    displayName: 'Chart',
    name: 'ViewChart',
  },
  {
    displayName: 'View',
    name: 'ViewContact',
  },
  {
    displayName: 'Quote',
    name: 'ViewQuote',
  },
  {
    displayName: 'News',
    name: 'ViewNews',
  },
  {
    displayName: 'Details',
    name: 'ViewInstrument',
  },
  {
    displayName: 'Analyze',
    name: 'ViewAnalysis',
  },
];

export const MOCK_CONTEXTS = [
  {
    $type: 'fdc3.instrument',
    id: {
      CUSIP: '037833100',
      FIGI: 'BBG000B9XRY4',
      ISIN: 'US0378331005',
      ticker: 'aapl',
    },
    name: 'Apple',
  },
  {
    $type: 'fdc3.contact',
    id: {
      email: 'nick@openfin.co',
      phone: '9171234567',
      twitter: 'nkolba',
    },
    name: 'Nick Kolba',
  },
  {
    $type: 'fdc3.organization',
    id: {
      LEI: 'VGRQXHF3J8VDLUA7XE92',
      PERMID: '4295904307',
    },
    name: 'IBM',
  },
  {
    $type: 'fdc3.contactList',
    contacts: [
      {
        $type: 'fdc3.contact',
        id: {
          email: 'nick@openfin.co',
        },
        name: 'Nick Kolba',
      },
      {
        $type: '$fdc3.contact',
        id: {
          email: 'espen@openfin.co',
        },
        name: 'Espen Overbye',
      },
    ],
  },
  {
    $type: 'fdc3.position',
    holding: 500,
    instrument: {
      $type: 'fdc3.instrument',
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
