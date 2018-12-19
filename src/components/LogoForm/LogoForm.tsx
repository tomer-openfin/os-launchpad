import { Formik, FormikHandlers, FormikProps } from 'formik';
import * as React from 'react';

import { Color } from '../../styles/index';
import Button from '../Button';
import LogoInput from '../LogoInput';
import { ButtonsWrapper, Label, StyledForm } from './LogoForm.css';

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
  saveLogo: (logo: File) => void;
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
    const { saveLogo } = this.props;
    const { file } = this.state;

    if (!file) {
      return;
    }

    saveLogo(file);
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

  renderForm = (formikProps: FormikProps<FormikInitialValues>) => {
    const { logo } = this.props;
    return (
      <StyledForm>
        <Label htmlFor={FILE_INPUT_ID}>
          <LogoInput fileInputId={FILE_INPUT_ID} logo={logo} name={FormNames.Logo} handleFileChange={this.handleFileChange} />
        </Label>

        <ButtonsWrapper>
          <Button disabled={!formikProps.dirty} type="submit" width={110}>
            Overwrite
          </Button>

          <Button disabled={!formikProps.dirty} onClick={this.handleReset(formikProps.handleReset)} type="button" width={110} backgroundColor={Color.MARS}>
            Reset
          </Button>
        </ButtonsWrapper>
      </StyledForm>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{
          [FormNames.Logo]: '',
        }}
        key={this.currentLogo}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default LogoForm;
