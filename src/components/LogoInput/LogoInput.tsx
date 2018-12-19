import { Field, FieldProps } from 'formik';
import * as React from 'react';

import Logo from '../Logo/Logo';

import { Input, InputWrapper, LogoWrapper, Placeholder, Wrapper } from './LogoInput.css';

const FILE_ACCEPT = 'image/*';

interface Props {
  fileInputId?: string;
  logo: string;
  name: string;
  handleFileChange: Function;
}

class LogoInput extends React.PureComponent<Props, {}> {
  renderFileInput = ({ field }: FieldProps) => {
    const { handleFileChange, fileInputId } = this.props;

    return <Input {...field} accept={FILE_ACCEPT} id={fileInputId} onChange={handleFileChange(field.onChange)} type="file" />;
  };

  renderInput = () => {
    const { name } = this.props;

    return (
      <InputWrapper>
        <Placeholder>Click & drag a new image over the existing one to replace your brand logo.</Placeholder>

        <Field name={name} render={this.renderFileInput} />
      </InputWrapper>
    );
  };

  render() {
    const { logo } = this.props;

    return (
      <Wrapper>
        <LogoWrapper>
          <Logo imgSrc={logo} />
        </LogoWrapper>

        {this.renderInput()}
      </Wrapper>
    );
  }
}

export default LogoInput;
