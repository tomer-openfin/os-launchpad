import * as React from 'react';

import { storiesOf } from '@storybook/react';

import AppData from '../../const/AppData';
import { noopCreator } from '../../utils/noop';

import AppCard from './index';

storiesOf('Components/AppCard', module)
  .add('default', () => (
    <AppCard app={AppData[0]} />
  ));
