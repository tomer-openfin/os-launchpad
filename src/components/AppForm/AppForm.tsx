import { FormikProps } from 'formik';
import * as React from 'react';

import { App } from '../../types/commons';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';

import * as EditIcon from '../../assets/Edit.svg';

import { CheckboxWrapper, RowWrapper } from '../RequestForm';
import { IconPreviewMeta, IconPreviewMetaWrapper, IconPreviewWrapper } from './AppForm.css';

import CheckboxInArray from '../CheckboxInArray';
import FormField, { Label, LabelText } from '../FormField';
import ImagePreview from '../ImagePreview';
import ImageUpload from '../ImageUpload';
import Modal from '../Modal';
import RadioToggle from '../RadioToggle';
import ResponsiveForm from '../ResponsiveForm';
import SvgIcon from '../SvgIcon';

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

interface Props extends FormikProps<Values> {
  focusFieldOnInitialMount?: boolean;
  handleCancel: () => void;
}

interface State {
  iconFormOpen: boolean;
}

interface Values extends Partial<App> {
  withAppUrl?: boolean;
}

type SetFieldValue = (field: keyof Values, value, shouldValidate?: boolean) => void;

const defaultState: State = { iconFormOpen: false };

class AppForm extends React.Component<Props, State> {
  state: State = defaultState;
  private inputField: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.inputField = React.createRef<HTMLInputElement>();
  }

  componentDidMount() {
    if (this.props.focusFieldOnInitialMount) {
      this.focusInputField();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { values: newValues } = this.props;
    const { withAppUrl: newWithAppUrl } = newValues;

    const { values: oldValues } = prevProps;
    const { withAppUrl: oldWithAppUrl } = oldValues;

    // focus inputField when Radio input is toggled
    if (newWithAppUrl !== oldWithAppUrl) {
      this.focusInputField();
    }
  }

  focusInputField = () => {
    if (this.inputField.current) {
      this.inputField.current.focus();
    }
  };

  handleOpenIconForm = () => this.setState({ iconFormOpen: true });
  handleCloseIconForm = () => this.setState({ iconFormOpen: false });

  saveImage = (setFieldValue: SetFieldValue) => (imgSrc: string) => {
    setFieldValue('icon', imgSrc);

    this.handleCloseIconForm();
  };

  render() {
    const { handleCancel, isValid, isSubmitting, setFieldValue, values } = this.props;
    const { iconFormOpen } = this.state;

    return (
      <ResponsiveForm handleCancel={handleCancel} isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid}>
        <RowWrapper firstElementWidth="100px">
          <RadioToggle label="Config Type" name="withAppUrl" value={!!values.withAppUrl} firstRadioLabel="App URL" secondRadioLabel="Manifest" />

          <FormField
            htmlInputRef={this.inputField}
            key={values.withAppUrl ? 'appUrl' : 'manifest_url'}
            label={values.withAppUrl ? 'App URL' : 'Manifest URL'}
            type="text"
            name={values.withAppUrl ? 'appUrl' : 'manifest_url'}
            placeholder={`Enter ${values.withAppUrl ? 'app' : 'manifest'} url`}
          />
        </RowWrapper>

        <FormField label="App Title" type="text" name="title" placeholder="Enter app title" />

        <RowWrapper firstElementWidth="100px" height="144px">
          <Label>
            <LabelText>App Shortcut</LabelText>

            <IconPreviewWrapper>
              <ImagePreview imgSrc={values.icon || ''} size={68} />

              <IconPreviewMetaWrapper>
                <IconPreviewMeta>64x64</IconPreviewMeta>

                <SvgIcon imgSrc={EditIcon} size={20} onClick={this.handleOpenIconForm} />
              </IconPreviewMetaWrapper>
            </IconPreviewWrapper>
          </Label>

          <FormField label="Description" type="text" component="textarea" name="description" placeholder="Enter description" />
        </RowWrapper>

        {iconFormOpen && (
          <Modal handleClose={this.handleCloseIconForm}>
            <ImageUpload
              handleCancel={this.handleCloseIconForm}
              headerText={`Upload a new image asset for ${values.title}`}
              height="326px"
              saveImage={this.saveImage(setFieldValue)}
              width="420px"
            />
          </Modal>
        )}
      </ResponsiveForm>
    );
  }
}

export default AppForm;
