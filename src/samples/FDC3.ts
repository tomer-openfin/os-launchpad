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
