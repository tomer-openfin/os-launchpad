import * as React from 'react';

import { ButtonWrapper, InputWrapper, Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button/index';

interface Props {
  handleClose: () => void;
  children: React.ReactNode;
}

const SupportFormConfirmation = ({ handleClose, children }: Props) => {
  return (
    <Wrapper>
      {children}
      <ButtonWrapper>
        <Button width={153} onClick={handleClose}>
          OK
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
