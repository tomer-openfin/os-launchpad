import * as React from 'react';

import { Color } from '../../styles';
import Button from '../Button';
import { ButtonWrapper, Wrapper } from './FormFooter.css';

import Loading from '../Loading';

interface Props {
  buttonWidths?: number;
  footerColor?: Color;
  handleCancel?: () => void;
  isSubmitting: boolean;
  submitDisabled: boolean;
}

const FormFooter = ({ isSubmitting, submitDisabled, buttonWidths = 128, footerColor, handleCancel }: Props) => (
  <Wrapper color={footerColor}>
    <ButtonWrapper>
      <Button type="submit" width={buttonWidths} disabled={submitDisabled}>
        {isSubmitting ? <Loading size={15} /> : 'Save'}
      </Button>

      <Button onClick={handleCancel} backgroundColor={Color.MERCURY} type="button" width={buttonWidths}>
        Cancel
      </Button>
    </ButtonWrapper>
  </Wrapper>
);

export default FormFooter;
