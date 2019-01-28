import * as React from 'react';

import Button, { ButtonLink } from '../Button/Button.css';
import FormField from '../FormField';
import { ButtonWrapper, Footer, FormWrapper, GridWrapper } from './PasswordForm.css';

import { Color } from '../../styles';
import { validateTextField } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

interface Props {
  isSubmitting: boolean;
  isValid: boolean;
}

const PasswordForm = ({ isSubmitting, isValid }: Props) => (
  <FormWrapper>
    <GridWrapper>
      <FormField isInvalid={!isValid} label="Old Password" name="password" placeholder="Enter Old Password" type="password" validate={validateTextField} />

      <FormField isInvalid={!isValid} label="New Password" name="newPassword" placeholder="Enter New Password" type="password" validate={validateTextField} />

      <FormField
        isInvalid={!isValid}
        label="Confirm New Password"
        name="confirmPassword"
        placeholder="Enter New Password Again"
        type="password"
        validate={validateTextField}
      />
    </GridWrapper>

    <Footer>
      <ButtonWrapper>
        <ButtonLink to={ROUTES.SETTINGS} backgroundColor={Color.MERCURY} type="button" width={153}>
          Cancel
        </ButtonLink>

        <Button type="submit" width={153} disabled={isSubmitting || !isValid}>
          Save
        </Button>
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default PasswordForm;
