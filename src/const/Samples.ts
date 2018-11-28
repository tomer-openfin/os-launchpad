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
