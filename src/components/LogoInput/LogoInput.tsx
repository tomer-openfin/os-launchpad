import { Field, FieldProps } from 'formik';
import * as React from 'react';

import Logo from '../Logo/Logo';

import { Anchor, Input, InputWrapper, Placeholder, Wrapper } from './LogoInput.css';

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
        <Anchor>Change Logo</Anchor>

        <Placeholder>
          {/* TODO: do the check for max file dimensions of 200x200 and size of 20kb */}
          Files must be at least 200 x 200 pixels square.
          <br />
          File size cannot exceed 20kb.
        </Placeholder>

        <Field name={name} render={this.renderFileInput} />
      </InputWrapper>
    );
  };

  render() {
    const { logo } = this.props;

    return (
      <Wrapper>
        <Logo imgSrc={logo} />

        {this.renderInput()}
      </Wrapper>
    );
  }
}

export default LogoInput;
