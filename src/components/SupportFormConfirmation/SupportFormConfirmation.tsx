import * as React from 'react';

import { ButtonWrapper, Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button';

interface Props {
  handleClose: () => void;
  children: React.ReactNode;
}

const SupportFormConfirmation = ({ children, handleClose }: Props) => {
  return (
    <Wrapper>
      {children}

      <ButtonWrapper>
        <Button width={153} onClick={handleClose}>
          Ok
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
