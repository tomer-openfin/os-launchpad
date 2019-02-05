import * as React from 'react';

import * as passwordIcon from '../../assets/Eye.svg';

import { Color } from '../../styles';
import { PasswordIconWrapper, RowWrapper } from '../RequestForm';

import { validateEmail, validatePhone, validateTextField } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

import FormField from '../FormField';
import ResponsiveForm from '../ResponsiveForm';
import SvgIcon from '../SvgIcon/SvgIcon';

interface Props {
  isPasswordShown?: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  togglePasswordFieldType?: () => void;
  withPasswordField?: boolean;
}

export const UserForm = ({ isPasswordShown, isSubmitting, isValid, togglePasswordFieldType, withPasswordField }: Props) => (
  <ResponsiveForm parentRoute={ROUTES.ADMIN_USERS} submitDisabled={isSubmitting || !isValid}>
    <RowWrapper secondElementWidth="55px">
      <FormField label="First Name" type="text" name="firstName" validate={validateTextField} placeholder="Enter first name" />

      <FormField label="MI" type="text" name="middleInitial" />
    </RowWrapper>

    <FormField label="Last Name" type="text" name="lastName" validate={validateTextField} placeholder="Enter last name" />

    <FormField label="Phone Number" type="text" name="phone" maxLength="10" validate={validatePhone} placeholder="Enter phone number" />

    <FormField label="Email" type="email" name="email" validate={validateEmail} placeholder="Enter email" disabled={!withPasswordField} />

    {withPasswordField && (
      <FormField label="Password" type={isPasswordShown ? 'text' : 'password'} name="tmpPassword" validate={validateTextField} placeholder="Enter password">
        <PasswordIconWrapper>
          <SvgIcon
            color={isPasswordShown ? Color.URANUS : Color.COMET}
            hoverColor={Color.JUPITER}
            onClick={togglePasswordFieldType}
            imgSrc={passwordIcon}
            size={25}
          />
        </PasswordIconWrapper>
      </FormField>
    )}
  </ResponsiveForm>
);

export default UserForm;
