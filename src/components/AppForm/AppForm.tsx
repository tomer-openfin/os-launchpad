import * as React from 'react';
import * as Yup from 'yup';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';
import { ROUTES } from '../Router/consts';

import { CheckboxWrapper, RowWrapper } from '../RequestForm';

import CheckboxInArray from '../CheckboxInArray';
import FormField, { Label, LabelText } from '../FormField';
import RadioToggle from '../RadioToggle';
import ResponsiveForm from '../ResponsiveForm';

export const validationSchema = Yup.object().shape({
  // only require either appUrl OR manifest_url but not both at the same time
  // withAppUrl = true when appUrl radio toggled, false when manifest_url toggled
  appUrl: Yup.string().when('withAppUrl', {
    is: withAppUrlVal => withAppUrlVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  contexts: Yup.array().notRequired(), // enable when bring back contexts
  description: Yup.string().required('Required'),
  icon: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
  id: Yup.string().notRequired(),
  images: Yup.array().notRequired(),
  intents: Yup.array().notRequired(), // enable when bring back contexts
  manifest_url: Yup.string().when('withAppUrl', {
    is: withAppUrlVal => !withAppUrlVal,
    then: Yup.string()
      .url('Must be a valid URL')
      .required('Required'),
  }),
  name: Yup.string(), // injected by us before payload is sent
  title: Yup.string().required('Required'),
  withAppUrl: Yup.boolean(),
});

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
  <ResponsiveForm isSubmitting={isSubmitting} parentRoute={ROUTES.ADMIN_APPS} submitDisabled={isSubmitting || !isValid}>
    <RowWrapper firstElementWidth="100px">
      <RadioToggle label="Config Type" name="withAppUrl" value={values.withAppUrl} firstRadioLabel="App URL" secondRadioLabel="Manifest" />

      <FormField
        key={values.withAppUrl ? 'appUrl' : 'manifest_url'}
        label={values.withAppUrl ? 'App URL' : 'Manifest URL'}
        type="text"
        name={values.withAppUrl ? 'appUrl' : 'manifest_url'}
        placeholder={`Enter ${values.withAppUrl ? 'app' : 'manifest'} url`}
      />
    </RowWrapper>

    <FormField label="App Title" type="text" name="title" placeholder="Enter app title" />

    <RowWrapper height="99px">
      <FormField label="Description" type="text" component="textarea" name="description" placeholder="Enter description" />

      <FormField label="App Icon URL" type="text" name="icon" placeholder="Enter app icon url" />
    </RowWrapper>
  </ResponsiveForm>
);

export default AppForm;
