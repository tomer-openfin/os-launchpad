import * as React from 'react';

import { CloseButtonWrapper, CloseCTA, CloseIcon } from './CloseButton.css';

const handleClose = () => {
  fin.desktop.Window.getCurrent().hide();
};

export interface CloseButtonProps {
  bottomBorder?: boolean;
}

const CloseButton = ({ bottomBorder }: CloseButtonProps) => (
  <CloseButtonWrapper bottomBorder={bottomBorder} >
    <CloseCTA onClick={handleClose}>
      <CloseIcon />
    </CloseCTA>
  </CloseButtonWrapper>
);

export default CloseButton;
