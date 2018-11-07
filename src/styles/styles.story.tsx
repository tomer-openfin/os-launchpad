import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { H1, H2, H3, H4 } from './typography.css';

storiesOf('Typography', module).add('default', () => (
  <React.Fragment>
    <H1>H1</H1>
    <H2>H2</H2>
    <H3>H3</H3>
    <H4>H4</H4>
  </React.Fragment>),
);
