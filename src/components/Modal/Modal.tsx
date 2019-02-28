import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Overlay } from './Modal.css';

const modals = document.getElementById('modals');

interface Props {
  children?: React.ReactNode;
  handleClose: Function;
}

const OVERLAY_CLASS = 'overlay';

const createHandleClose = (cb: Function) => (event: React.SyntheticEvent<HTMLDivElement>) => {
  // Prevent event from bubbling to other overlays
  event.stopPropagation();

  if ((event.target as Element).classList.contains(OVERLAY_CLASS)) {
    cb();
  }
};

const Modal = ({ children, handleClose }: Props) => {
  if (!modals) {
    // tslint:disable-next-line:no-console
    console.log('Modal root div not found.');
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay className={OVERLAY_CLASS} onClick={createHandleClose(handleClose)}>
      {children}
    </Overlay>,
    modals,
  );
};

export default Modal;
