import * as React from 'react';

import { Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button';

interface Props {
  children: React.ReactNode;
  handleClose: () => void;
}

const SupportFormConfirmation = ({ children, handleClose }: Props) => {
  return (
    <Wrapper>
      {children}

      <Button width={305} onClick={handleClose}>
        Ok
      </Button>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
