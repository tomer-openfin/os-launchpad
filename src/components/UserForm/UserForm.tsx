import * as React from 'react';

import * as passwordIcon from '../../assets/Eye.svg';

import { Color } from '../../styles';

import { renderError } from '../../utils/renderError';
import FormFooter from '../FormFooter';
import Input from '../Input/index';
import Label from '../Label/Label';
import ScrollGrid, { Form, PasswordIconWrapper, RowWrapper } from '../Responsive';
import SvgIcon from '../SvgIcon';

interface Touched {
  email?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  middleInitial?: boolean;
  phone?: boolean;
  tmpPassword?: boolean;
}

interface Errors {
  email?: string;
  firstName?: string;
  lastName?: string;
  middleInitial?: string;
  phone?: string;
  tmpPassword?: string;
}

export interface Values {
  email: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  phone: string;
  tmpPassword?: string;
  id: string;
  username: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleCancel: () => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  touched: Touched;
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
    const { className, errors, handleBlur, handleCancel, handleChange, handleSubmit, isSubmitting, isValid, touched, values, withPasswordField } = this.props;
    const { isPasswordShown } = this.state;

    return (
      <Form className={className} onSubmit={handleSubmit}>
        <ScrollGrid>
          <RowWrapper secondElementWidth="55px">
            <Label label="First Name" renderError={renderError(errors.firstName, touched.firstName)}>
              <Input
                hasError={!!errors.firstName && touched.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                placeholder="Enter first name"
              />
            </Label>

            <Label label="MI" renderError={renderError(errors.middleInitial, touched.middleInitial)}>
              <Input
                hasError={!!errors.middleInitial && touched.middleInitial}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleInitial}
                name="middleInitial"
              />
            </Label>
          </RowWrapper>

          <Label label="Last Name" renderError={renderError(errors.lastName, touched.lastName)}>
            <Input
              hasError={!!errors.lastName && touched.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              placeholder="Enter last name"
            />
          </Label>

          <Label label="Phone" renderError={renderError(errors.phone, touched.phone)}>
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

          <Label label="Email" renderError={renderError(errors.email, touched.email)}>
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

          {withPasswordField && (
            <Label label="Password" renderError={renderError(errors.tmpPassword, touched.tmpPassword)}>
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
          )}
        </ScrollGrid>

        <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} />
      </Form>
    );
  }
}

export default UserForm;
