import * as React from 'react';

import * as passwordIcon from '../../assets/Eye.svg';

import { Color } from '../../styles';
import { renderError } from '../../utils/renderError';

import Checkbox from '../Checkbox';
import FormFooter from '../FormFooter';
import Input from '../Input';
import Label from '../Label';
import ScrollGrid, { Form, PasswordIconWrapper } from '../Responsive';
import SvgIcon from '../SvgIcon';
import { StyledLabel, StyledRowWrapper } from './UserForm.css';

interface Touched {
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  middleInitial?: boolean;
  phone?: boolean;
  tmpPassword?: boolean;
  sendEmail?: boolean;
}

interface Errors {
  email?: string;
  firstName?: string;
  lastName?: string;
  middleInitial?: string;
  phone?: string;
  sendEmail?: string;
  tmpPassword?: string;
}

export interface Values {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  middleInitial?: string;
  phone: string;
  sendEmail?: boolean;
  tmpPassword?: string;
  username: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleCheck: () => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  touched: Touched;
  sendEmail?: boolean;
  values: Values;
  withPasswordField?: boolean;
}

interface State {
  isPasswordShown: boolean;
}

const defaultState: State = {
  isPasswordShown: false,
};

class UserForm extends React.Component<Props, State> {
  state: State = defaultState;

  togglePasswordFieldType = () => this.setState(prevState => ({ isPasswordShown: !prevState.isPasswordShown }));

  render() {
    const {
      className,
      errors,
      handleBlur,
      handleCancel,
      handleChange,
      handleSubmit,
      handleCheck,
      isSubmitting,
      isValid,
      touched,
      values,
      withPasswordField,
    } = this.props;
    const { isPasswordShown } = this.state;

    return (
      <Form className={className} onSubmit={handleSubmit}>
        <ScrollGrid>
          <StyledRowWrapper secondElementWidth="55px">
            <StyledLabel index={0} label="First Name" renderError={renderError(errors.firstName, touched.firstName)}>
              <Input
                hasError={!!errors.firstName && touched.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                placeholder="Enter first name"
              />
            </StyledLabel>

            <Label index={1} label="MI" renderError={renderError(errors.middleInitial, touched.middleInitial)}>
              <Input
                hasError={!!errors.middleInitial && touched.middleInitial}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleInitial}
                name="middleInitial"
              />
            </Label>
          </StyledRowWrapper>

          <Label index={2} label="Last Name" renderError={renderError(errors.lastName, touched.lastName)}>
            <Input
              hasError={!!errors.lastName && touched.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              placeholder="Enter last name"
            />
          </Label>

          <Label index={3} label="Email" renderError={renderError(errors.email, touched.email)}>
            <Input
              hasError={!!errors.email && touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              placeholder="Enter email"
              type="email"
              disabled={!withPasswordField}
            />
          </Label>

          <Label index={4} label="Phone Number" renderError={renderError(errors.phone, touched.phone)}>
            <Input
              hasError={!!errors.phone && touched.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name="phone"
              placeholder="Enter phone number"
              maxLength={10}
            />
          </Label>

          {withPasswordField && (
            <>
              <Label index={5} label="Password" renderError={renderError(errors.tmpPassword, touched.tmpPassword)}>
                <Input
                  hasError={!!errors.tmpPassword && touched.tmpPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tmpPassword}
                  name="tmpPassword"
                  placeholder="Enter password"
                  type={isPasswordShown ? 'text' : 'password'}
                />

                <PasswordIconWrapper>
                  <SvgIcon
                    color={isPasswordShown ? Color.URANUS : Color.COMET}
                    hoverColor={Color.JUPITER}
                    onClick={this.togglePasswordFieldType}
                    imgSrc={passwordIcon}
                    size={25}
                  />
                </PasswordIconWrapper>
              </Label>

              <Checkbox index={6} onChange={handleCheck} checked={!!values.sendEmail} label="Send Installation Instructions" />
            </>
          )}
        </ScrollGrid>

        <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} />
      </Form>
    );
  }
}

export default UserForm;
