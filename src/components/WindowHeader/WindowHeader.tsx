import * as React from 'react';

import { CloseButton, CloseIcon, Header } from './WindowHeader.css';

const handleClose = () => {
  fin.desktop.Window.getCurrent().hide();
};

const WindowHeader = () => (
  <Header>
    <CloseButton onClick={handleClose}>
      <CloseIcon />
    </CloseButton>
  </Header>
);

export default WindowHeader;
