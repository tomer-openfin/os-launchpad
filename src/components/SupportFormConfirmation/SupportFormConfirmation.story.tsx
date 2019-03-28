import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';
import { P } from '../Support';

import SupportFormConfirmation from './SupportFormConfirmation';

storiesOf(`${CATEGORIES.COMPONENTS}SupportFormConfirmation`, module)
  .addDecorator(withKnobs)
  .add('default bug success', () => {
    const handleClose = action('handleClose');
    const referenceNumber = text('referenceNumber', '123456789');
    const supportEmail = text('supportEmail', 'support@openfin.co');

    return (
      <SupportFormConfirmation handleClose={handleClose}>
        <P>Thank you, your support ticket has been submitted.</P>

        <P>{`Your reference number is #${referenceNumber}.`}</P>

        <P>
          You may follow up with this ticket by contacting <span>{supportEmail}</span>.
        </P>
      </SupportFormConfirmation>
    );
  });
