import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import AdminConfirmation from './AdminConfirmation';
import AdminConfirmationView from './AdminConfirmationView';

const deleteApp = action('deleteApp');

storiesOf(`${CATEGORIES.ADMIN}AdminConfirmation`, module)
  .addDecorator(withKnobs)
  .add('view', () => {
    const errorText = text('Error Text', 'Failed to confirm: Error. Please try again');
    const headingText = text('Heading Text', 'Confirm?');
    const confirmationText = text('Confirmation Text', 'Are you sure you would like to confirm?');
    const cancelCtaText = text('Cancel Button Text', 'Cancel');
    const confirmCtaText = text('Confirm Button Text', 'Confirm');
    const confirmButtonDisabled = boolean('Confirm Disabled', false);
    const errorShown = boolean('Error Shown', false);

    return (
      <AdminConfirmationView
        cancelCtaText={cancelCtaText}
        confirmationText={confirmationText}
        confirmButtonDisabled={confirmButtonDisabled}
        confirmCtaText={confirmCtaText}
        errorText={errorShown ? errorText : ''}
        headingText={headingText}
        handleConfirm={deleteApp}
        parentRoute=""
      />
    );
  })
  .add('stateful', () => {
    const errorMessage = text('Error Message', 'Failed to confirm');
    const headingText = text('Heading Text', 'Confirm?');
    const confirmationText = text('Confirmation Text', 'Are you sure you would like to confirm?');
    const cancelCtaText = text('Cancel Button Text', 'Cancel');
    const confirmCtaText = text('Confirmation Text', 'Confirm');

    return (
      <AdminConfirmation
        cancelCtaText={cancelCtaText}
        confirmationText={confirmationText}
        confirmCtaText={confirmCtaText}
        errorMessage={errorMessage}
        headingText={headingText}
        onConfirm={deleteApp}
        onConfirmSuccess={noop}
        parentRoute=""
      />
    );
  });
