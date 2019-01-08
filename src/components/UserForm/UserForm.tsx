import * as React from 'react';

import * as passwordIcon from '../../assets/Eye.svg';

import { Color } from '../../styles';
import Button, { ButtonLink } from '../Button/Button.css';
import { ButtonWrapper, Footer, FormWrapper, GridWrapper, PasswordIconWrapper, RowWrapper, ScrollWrapper } from './UserForm.css';

import { validateEmail, validatePhone, validateTextField } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

import FormField from '../FormField';
import SvgIcon from '../SvgIcon/SvgIcon';

interface Props {
  isPasswordShown?: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  togglePasswordFieldType?: () => void;
  withPasswordField?: boolean;
}

export const UserForm = ({ isPasswordShown, isSubmitting, isValid, togglePasswordFieldType, withPasswordField }: Props) => (
  <FormWrapper>
    <ScrollWrapper>
      <GridWrapper>
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
              <SvgIcon color={Color.COMET} onClick={togglePasswordFieldType} imgSrc={passwordIcon} size={25} />
            </PasswordIconWrapper>
          </FormField>
        )}
      </GridWrapper>
    </ScrollWrapper>

    <Footer>
      <ButtonWrapper>
        <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={128}>
          Cancel
        </ButtonLink>

        <Button type="submit" width={128} disabled={isSubmitting || !isValid}>
          Save
        </Button>
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default UserForm;
