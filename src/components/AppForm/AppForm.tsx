import * as React from 'react';

import { App } from '../../types/commons';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';

import * as EditIcon from '../../assets/Edit.svg';

import { IconPreviewMeta, IconPreviewMetaWrapper, IconPreviewWrapper } from './AppForm.css';

import CheckboxInArray from '../CheckboxInArray';
import FormField, { Label, LabelText } from '../FormField';
import FormFooter from '../FormFooter';
import ImagePreview from '../ImagePreview';
import ImageUpload from '../ImageUpload';
import Modal from '../Modal';
import RadioToggle from '../RadioToggle';
import ScrollGrid, { CheckboxWrapper, Form, RowWrapper } from '../Responsive';
import SvgIcon from '../SvgIcon';

interface State {
  iconFormOpen: boolean;
}

export interface Values extends App {
  withAppUrl?: boolean;
}

export type SetFieldValue = <T extends keyof Values>(field: T, value: Values[T], shouldValidate?: boolean) => void;

export interface Props {
  focusFieldOnInitialMount?: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  setFieldValue: SetFieldValue;
  values: Values;
}

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

  renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <CheckboxInArray name="intents" key={index} value={intent.displayName} />);

  renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <CheckboxInArray name="contexts" key={index} value={context.$type} />);

  renderIntentsAndContextsRow = () => (
    <RowWrapper height="161px">
      <Label>
        <LabelText>Accepted Intent(s)</LabelText>

        <CheckboxWrapper>{this.renderMockIntents()}</CheckboxWrapper>
      </Label>

      <Label>
        <LabelText>Accepted Context(s)</LabelText>

        <CheckboxWrapper>{this.renderMockContexts()}</CheckboxWrapper>
      </Label>
    </RowWrapper>
  );

  render() {
    const { handleCancel, handleSubmit, isValid, isSubmitting, setFieldValue, values } = this.props;
    const { iconFormOpen } = this.state;

    return (
      <Form onSubmit={handleSubmit}>
        <ScrollGrid>
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
        </ScrollGrid>

        <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} />
      </Form>
    );
  }
}

export default AppForm;
