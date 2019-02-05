import * as React from 'react';

import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from '../Label';
import { RouterLink } from '../Link';
import Loading from '../Loading';
import { ROUTES } from '../Router/consts';
import { Form, Row } from './LoginForm.css';

interface Errors {
  username?: string;
  password?: string;
}

interface Touched {
  username?: boolean;
  password?: boolean;
}

export interface Values {
  username: string;
  password: string;
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

class LoginForm extends React.Component<Props> {
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
        <Label label="Email" renderError={renderError(errors.username, touched.username)}>
          <Input
            hasError={touched.username && !!errors.username}
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Email"
            ref={this.inputRef}
            value={values.username}
          />
        </Label>

        <Label label="Password" renderError={renderError(errors.password, touched.password)}>
          <Input
            hasError={touched.password && !!errors.password}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Password"
            type="password"
            value={values.password}
          />
        </Label>

        <Row>
          <Button>{isSubmitting ? <Loading size={15} /> : 'Log In'}</Button>

          <RouterLink to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</RouterLink>
        </Row>
      </Form>
    );
  }
}

export default LoginForm;
