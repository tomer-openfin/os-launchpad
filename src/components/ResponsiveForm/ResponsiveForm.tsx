import * as React from 'react';

import { Color } from '../../styles';
import Button, { ButtonLink } from '../Button';
import { ButtonWrapper, Footer, FormWrapper, GridWrapper, ScrollWrapper } from './ResponsiveForm.css';

import Loading from '../Loading';

interface Props {
  buttonWidths?: number;
  children: React.ReactNode;
  footerColor?: Color;
  handleCancel?: () => void;
  isSubmitting: boolean;
  parentRoute?: string;
  submitDisabled: boolean;
}

export const ResponsiveForm = ({ children, isSubmitting, parentRoute, submitDisabled, buttonWidths = 128, footerColor, handleCancel }: Props) => (
  <FormWrapper>
    <ScrollWrapper>
      <GridWrapper>{children}</GridWrapper>
    </ScrollWrapper>

    <Footer color={footerColor}>
      <ButtonWrapper>
        <Button type="submit" width={buttonWidths} disabled={submitDisabled}>
          {isSubmitting ? <Loading size={15} /> : 'Save'}
        </Button>

        {handleCancel || !parentRoute ? (
          <Button onClick={handleCancel} backgroundColor={Color.MERCURY} type="button" width={buttonWidths}>
            Cancel
          </Button>
        ) : (
          <ButtonLink to={parentRoute} backgroundColor={Color.MERCURY} type="button" width={buttonWidths}>
            Cancel
          </ButtonLink>
        )}
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default ResponsiveForm;
