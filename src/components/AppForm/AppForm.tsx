import * as React from 'react';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';
import { ROUTES } from '../Router/consts';

import { validateTextField, validateURL } from '../../utils/validators';

import { CheckboxWrapper, RowWrapper } from '../RequestForm';

import CheckboxInArray from '../CheckboxInArray';
import FormField, { Label, LabelText } from '../FormField';
import RadioToggle from '../RadioToggle';
import ResponsiveForm from '../ResponsiveForm';

const renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <CheckboxInArray name="intents" key={index} value={intent.displayName} />);

const renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <CheckboxInArray name="contexts" key={index} value={context.$type} />);

const renderIntentsAndContextsRow = () => (
  <RowWrapper height="161px">
    <Label>
      <LabelText>Accepted Intent(s)</LabelText>

      <CheckboxWrapper>{renderMockIntents()}</CheckboxWrapper>
    </Label>

    <Label>
      <LabelText>Accepted Context(s)</LabelText>

      <CheckboxWrapper>{renderMockContexts()}</CheckboxWrapper>
    </Label>
  </RowWrapper>
);

const AppForm = ({ isValid, isSubmitting, values }) => (
  <ResponsiveForm parentRoute={ROUTES.ADMIN_APPS} submitDisabled={isSubmitting || !isValid}>
    <RowWrapper firstElementWidth="100px">
      <RadioToggle label="Config Type" name="withAppUrl" value={values.withAppUrl} firstRadioLabel="App URL" secondRadioLabel="Manifest" />

      <FormField
        key={values.withAppUrl ? 'appUrl' : 'manifest_url'}
        label={values.withAppUrl ? 'App URL' : 'Manifest URL'}
        type="text"
        name={values.withAppUrl ? 'appUrl' : 'manifest_url'}
        validate={validateURL}
        placeholder={`Enter ${values.withAppUrl ? 'app' : 'manifest'} url`}
      />
    </RowWrapper>

    <FormField label="App Title" type="text" name="title" validate={validateTextField} placeholder="Enter app title" />

    <RowWrapper height="99px">
      <FormField label="Description" type="text" component="textarea" name="description" validate={validateTextField} placeholder="Enter description" />

      <FormField label="App Icon URL" type="text" name="icon" validate={validateURL} placeholder="Enter app icon url" />
    </RowWrapper>
  </ResponsiveForm>
);

export default AppForm;
