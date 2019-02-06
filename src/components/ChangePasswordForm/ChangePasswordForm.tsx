import * as React from 'react';

import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import { Form, StyledButton } from './ChangePasswordForm.css';

interface Errors {
  newPassword?: string;
  confirmPassword?: string;
}

interface Touched {
  newPassword?: boolean;
  confirmPassword?: boolean;
}

export interface Values {
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  touched: Touched;
  values: Values;
}

const renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);

class ChangePasswordForm extends React.Component<Props> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { className, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = this.props;

    return (
      <Form className={className} onSubmit={handleSubmit}>
        <Label label="New Password" renderError={renderError(errors.newPassword, touched.newPassword)}>
          <Input
            hasError={!!errors.newPassword && touched.newPassword}
            name="newPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="New Password"
            ref={this.inputRef}
            type="password"
            value={values.newPassword}
          />
        </Label>

        <Label label="Password Confirmation" renderError={renderError(errors.confirmPassword, touched.confirmPassword)}>
          <Input
            hasError={!!errors.confirmPassword && touched.confirmPassword}
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            value={values.confirmPassword}
          />
        </Label>

        <StyledButton>{isSubmitting ? <Loading size={15} /> : 'Create New Password'}</StyledButton>
      </Form>
    );
  }
}

export default ChangePasswordForm;
