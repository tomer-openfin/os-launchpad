import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Button from './Button';

const noop = () => {
  /* tslint:disable:no-console */
  console.log('here');
};

storiesOf('Button', module).add('default', () => <Button onClick={noop} />);
