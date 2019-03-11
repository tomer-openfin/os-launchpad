import * as React from 'react';

import { Color } from '../../styles';
import { ButtonWrapper, Footer, FormWrapper, GridWrapper, ScrollWrapper } from './ResponsiveForm.css';

import Button from '../Button';
import Loading from '../Loading';

interface Props {
  buttonWidths?: number;
  children: React.ReactNode;
  footerColor?: Color;
  handleCancel?: () => void;
  isSubmitting: boolean;
  submitDisabled: boolean;
}

export const ResponsiveForm = ({ children, footerColor, handleCancel, isSubmitting, submitDisabled, buttonWidths = 128 }: Props) => (
  <FormWrapper>
    <ScrollWrapper>
      <GridWrapper>{children}</GridWrapper>
    </ScrollWrapper>

    <Footer color={footerColor}>
      <ButtonWrapper>
        <Button type="submit" width={buttonWidths} disabled={submitDisabled}>
          {isSubmitting ? <Loading size={15} /> : 'Save'}
        </Button>

        <Button onClick={handleCancel} type="button" width={buttonWidths}>
          Cancel
        </Button>
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default ResponsiveForm;
