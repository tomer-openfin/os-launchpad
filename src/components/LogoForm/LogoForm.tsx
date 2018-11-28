import { Field, FieldProps, Formik, FormikHandlers, FormikProps } from 'formik';
import * as React from 'react';

import ApiService from '../../services/ApiService';

import Logo from '../Logo';
import { Anchor, Input, InputWrapper, Label, Placeholder, StyledButton, StyledForm, Wrapper } from './LogoForm.css';

const BASE_ID = 'LogoForm';
const FILE_INPUT_ID = `${BASE_ID}FileInput`;
const FILE_ACCEPT = 'image/*';

enum FormNames {
  Logo = 'logo',
}

interface FormikInitialValues {
  [FormNames.Logo]: string;
}

interface Props {
  logo: string;
  setLogo: (logo: string) => void;
}

interface State {
  file: File | null;
}

class LogoForm extends React.PureComponent<Props, State> {
  currentLogo: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      file: null,
    };

    this.currentLogo = props.logo;
  }

  componentWillUnmount() {
    this.handleResetProps();
  }

  handleSubmit = () => {
    const { logo } = this.props;
    const { file } = this.state;

    if (!file) {
      return;
    }

    ApiService.saveAdminLogo(file)
      .then(nextLogo => {
        URL.revokeObjectURL(logo);
        this.currentLogo = nextLogo;
        this.forceUpdate();
      })
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.log('Error saving logo:', e);
      });
  };

  handleFileChange = (fn: FormikHandlers['handleChange']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Must pass checks to change file input
    // 1 - Files must exist
    // 2 - Must have at least 1 file
    // 3 - First file must pass accepted file type
    if (!files || !files.length || files[0].type.indexOf(FILE_ACCEPT.replace('*', '')) !== 0) {
      return;
    }

    // Execute Formik default handleChange functionality
    fn(e);

    // Formik does not keep file objects
    // So we must add in additonal logic to the default
    // to handle this cause with local state
    const { logo, setLogo } = this.props;
    const file = files[0];
    URL.revokeObjectURL(logo);
    const fileBlob = URL.createObjectURL(file);

    this.setState({ file });
    setLogo(fileBlob);
  };

  handleReset = (fn: FormikHandlers['handleReset']) => () => {
    // Execute Formik default handleReset functionality
    fn();

    // But also reset custom side effects needed in redux and state
    this.handleResetProps();
    const { file } = this.state;
    if (file) {
      this.setState({ file: null });
    }
  };

  handleResetProps = () => {
    const { logo, setLogo } = this.props;

    if (this.currentLogo !== logo) {
      URL.revokeObjectURL(logo);
      setLogo(this.currentLogo);
    }
  };

  renderFileInput = ({ field }: FieldProps) => {
    return <Input {...field} accept={FILE_ACCEPT} id={FILE_INPUT_ID} onChange={this.handleFileChange(field.onChange)} type="file" />;
  };

  renderForm = (formikProps: FormikProps<FormikInitialValues>) => {
    return (
      <StyledForm>
        <Label htmlFor={FILE_INPUT_ID}>
          <Logo large />

          <InputWrapper>
            <Anchor>Change Logo</Anchor>

            <Placeholder>
              {/* TODO: do the check for max file dimensions of 200x200 and size of 20kb */}
              Files must be at least 200 x 200 pixels square.
              <br />
              File size cannot exceed 20kb.
            </Placeholder>

            <Field name={FormNames.Logo} render={this.renderFileInput} />
          </InputWrapper>
        </Label>

        <StyledButton disabled={!formikProps.dirty} onClick={this.handleReset(formikProps.handleReset)} type="button" width={120}>
          Cancel
        </StyledButton>

        <StyledButton disabled={!formikProps.dirty} isDark type="submit" width={120}>
          Set Logo
        </StyledButton>
      </StyledForm>
    );
  };

  render() {
    return (
      <Wrapper>
        <Formik
          initialValues={{
            [FormNames.Logo]: '',
          }}
          key={this.currentLogo}
          onSubmit={this.handleSubmit}
          render={this.renderForm}
        />
      </Wrapper>
    );
  }
}

export default LogoForm;
