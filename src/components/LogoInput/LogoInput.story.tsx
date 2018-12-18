import { storiesOf } from '@storybook/react';
import * as React from 'react';

import * as EmptyLogo from '../../assets/empty-logo.svg';

import noop from '../../utils/noop';
import LogoInput from './LogoInput';

storiesOf('Components/LogoInput', module).add('default', () => <LogoInput logo={EmptyLogo} name="story" handleFileChange={noop} />);
