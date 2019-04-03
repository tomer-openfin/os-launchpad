import * as React from 'react';

import { App } from '../../types/commons';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';

import * as EditIcon from '../../assets/Edit.svg';

import { renderError } from '../../utils/renderError';
import { IconPreviewMeta, IconPreviewMetaWrapper, IconPreviewWrapper, StyledForm } from './AppForm.css';

import CheckboxInArray from '../CheckboxInArray';
import FormFooter from '../FormFooter';
import ImagePreview from '../ImagePreview';
import ImageUpload from '../ImageUpload';
import Input from '../Input';
import Label from '../Label';
import Modal from '../Modal';
import RadioOption from '../RadioOption/index';
import RadioToggle from '../RadioToggle';
import ScrollGrid, { CheckboxWrapper, RowWrapper } from '../Responsive';
import SvgIcon from '../SvgIcon';

interface Touched {
  // contexts?: boolean;
  description?: boolean;
  icon?: boolean;
  id?: boolean;
  // images?: boolean;
  // intents?: boolean;
  name?: boolean;
  title?: boolean;
  url?: boolean;
}

interface Errors {
  // contexts?: Array<{ $type: string }>;
  description?: string;
  icon?: string;
  id?: string;
  // images?: string;
  // intents?: Array<{ $type: string }>;
  name?: string;
  title?: string;
  url?: string;
}

// enum ManifestType {
//   AppUrl = 'appUrl',
//   Manifest = 'manifest',
//   Path = 'path',
// }

export interface Values {
  // contexts: Array<{ $type: string }>;
  description: string;
  icon: string;
  id: string;
  // images?: Array<{ url: string }>;
  // intents?: Array<{ displayName: string; name: string }>;
  url: string;
  name: string;
  title: string;
  manifestType: 'manifest' | 'appUrl' | 'path';
}

interface Props {
  className?: string;
  errors: Errors;
  focusFieldOnInitialMount?: boolean;
  handleBlur: (e: React.FocusEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  // setFieldValue?: (field, value, shouldValidate) => void; // type out
  touched: Touched;
  values: Values;
}

interface State {
  iconFormOpen: boolean;
}

// export type SetFieldValue = <T extends keyof Values>(field: T, value: Values[T], shouldValidate?: boolean) => void;

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

  // TODO: add focusing back in?

  // componentDidUpdate(prevProps: Props) {
  //   const { values: newValues } = this.props;
  //   const { withAppUrl: newWithAppUrl } = newValues;

  //   const { values: oldValues } = prevProps;
  //   const { withAppUrl: oldWithAppUrl } = oldValues;

  //   // focus inputField when Radio input is toggled
  //   if (newWithAppUrl !== oldWithAppUrl) {
  //     this.focusInputField();
  //   }
  // }

  focusInputField = () => {
    if (this.inputField.current) {
      this.inputField.current.focus();
    }
  };

  handleOpenIconForm = () => this.setState({ iconFormOpen: true });
  handleCloseIconForm = () => this.setState({ iconFormOpen: false });

  // todo: come back and fix
  saveImage = (/*setFieldValue: SetFieldValue*/) => (imgSrc: string) => {
    // setFieldValue('icon', imgSrc);

    this.handleCloseIconForm();
  };

  // renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <CheckboxInArray name="intents" key={index} value={intent.displayName} />);

  // renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <CheckboxInArray name="contexts" key={index} value={context.$type} />);

  // renderIntentsAndContextsRow = () => (
  //   <RowWrapper height="161px">
  //     <Label>
  //       <LabelText>Accepted Intent(s)</LabelText>

  //       <CheckboxWrapper>{this.renderMockIntents()}</CheckboxWrapper>
  //     </Label>

  //     <Label>
  //       <LabelText>Accepted Context(s)</LabelText>

  //       <CheckboxWrapper>{this.renderMockContexts()}</CheckboxWrapper>
  //     </Label>
  //   </RowWrapper>
  // );

  render() {
    const {
      className,
      errors,
      // focusFieldOnInitialMount,
      handleBlur,
      handleCancel,
      handleChange,
      handleSubmit,
      isSubmitting,
      isValid,
      touched,
      values,
    } = this.props;

    const { iconFormOpen } = this.state;

    return (
      <StyledForm className={className} onSubmit={handleSubmit}>
        <ScrollGrid>
          <RowWrapper firstElementWidth="100px">
            <RadioOption
              label="App URL"
              optionName="manifestType"
              selectedOption={values.manifestType}
              option="appUrl"
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <RadioOption
              label="Manifest"
              optionName="manifestType"
              selectedOption={values.manifestType}
              option="manifest"
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Label label={values.manifestType === 'appUrl' ? 'App URL' : 'Manifest URL'} renderError={renderError(errors.url, touched.url)}>
              {/* todo: verify htmlInputRef behavior works the same as before */}
              <Input
                hasError={!!errors.url && touched.url}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.url}
                name="url"
                placeholder={`Enter ${values.manifestType === 'appUrl' ? 'app' : 'manifest'} url`}
                htmlInputRef={this.inputField}
              />
            </Label>
          </RowWrapper>

          <Label label="App Title" renderError={renderError(errors.title, touched.title)}>
            <Input
              hasError={!!errors.title && touched.title}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              placeholder="Enter app title"
            />
          </Label>

          <RowWrapper firstElementWidth="100px" height="144px">
            {/* todo: have StyledLabel (differs from default styling) */}
            <Label label="App Shortcut">
              <IconPreviewWrapper>
                <ImagePreview imgSrc={values.icon || ''} size={68} />

                <IconPreviewMetaWrapper>
                  <IconPreviewMeta>64x64</IconPreviewMeta>

                  <SvgIcon imgSrc={EditIcon} size={20} onClick={this.handleOpenIconForm} />
                </IconPreviewMetaWrapper>
              </IconPreviewWrapper>
            </Label>

            <Label label="Description" renderError={renderError(errors.description, touched.description)}>
              {/* todo: merge in develop and use TextArea component */}
              <Input
                hasError={!!errors.description && touched.description}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                placeholder="Enter description"
              />
            </Label>
          </RowWrapper>

          {iconFormOpen && (
            <Modal handleClose={this.handleCloseIconForm}>
              <ImageUpload
                handleCancel={this.handleCloseIconForm}
                headerText={`Upload a new image asset for ${values.title}`}
                height="326px"
                // todo: have ImageForm submit to this AppForm
                // see if setFieldValue can be re-used
                // saveImage={this.saveImage(setFieldValue)}
                saveImage={() => {}}
                width="420px"
              />
            </Modal>
          )}
        </ScrollGrid>
        <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} />;
      </StyledForm>
    );
  }
}

export default AppForm;
