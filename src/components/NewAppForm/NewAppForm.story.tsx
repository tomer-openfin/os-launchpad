import * as React from 'react';

import { storiesOf } from '@storybook/react';

import NewAppForm from './';

import noop from '../../utils/noop';

const mockData = {
  location: {
    state: {
      appPage: '/apps/fintech-studios',
      contact_email: 'jim@fintechstudios.com',
      contexts: [],
      description:
        'Using cutting edge artificial intelligence and machine learning, \
      FTS delivers actionable news, research, market analytics, and analytics from millions of sources.',
      icon: 'https://cdn.openfin.co/app_directory/img/1525196541056.jpg',
      id: '2',
      images: [
        { url: 'https://cdn.openfin.co/app_directory/img/1525196541004.jpg' },
        { url: 'https://cdn.openfin.co/app_directory/img/1525196541051.jpg' },
        { url: 'https://cdn.openfin.co/app_directory/img/1525196541054.jpg' },
      ],
      intents: [],
      manifest_url: 'https://openfin.fintechstudios.com/openfin_config.json',
      name: 'fintech-studios',
      publisher: 'openfin',
      signature: 'https://openfin.fintechstudios.com',
      support_email: null,
      title: 'FinTech Studios',
    },
  },
};

storiesOf('Components/NewAppForm', module).add('default', () => <NewAppForm location={mockData.location} createApp={noop} />);
