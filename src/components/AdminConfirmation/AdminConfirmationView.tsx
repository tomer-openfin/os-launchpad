import * as React from 'react';

import Borders from '../Borders/index';
import Button from '../Button';
import { ButtonWrapper, Copy, CopyWrapper, Error, Heading, HeadingText, Wrapper } from './AdminConfirmation.css';

interface Props {
  cancelCtaText?: string;
  confirmationText: string;
  confirmButtonDisabled?: boolean;
  confirmCtaText?: string;
  errorText?: string;
  handleCancel?: () => void;
  handleConfirm?: () => void;
  headingText: string;
  height?: string;
  width?: string;
  withoutCancel?: boolean;
}

const AdminConfirmationView = ({
  cancelCtaText,
  confirmationText,
  confirmButtonDisabled,
  confirmCtaText,
  errorText,
  handleCancel,
  handleConfirm,
  headingText,
  height,
  width,
  withoutCancel,
}: Props) => (
  <Wrapper height={height} width={width}>
    <Borders height="100%" width="100%">
      <Heading>
        <HeadingText>{headingText}</HeadingText>
      </Heading>

      <CopyWrapper>
        <Copy>{confirmationText}</Copy>
      </CopyWrapper>

      <ButtonWrapper>
        {withoutCancel ? (
          <Button onClick={handleConfirm} width={153}>
            {confirmCtaText || 'Confirm'}
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel} width={153}>
              {cancelCtaText || 'Cancel'}
            </Button>

            <Button disabled={confirmButtonDisabled} onClick={handleConfirm} width={153}>
              {confirmCtaText || 'Confirm'}
            </Button>
          </>
        )}
      </ButtonWrapper>

      <Error shown={!!errorText}>{errorText}</Error>
    </Borders>
  </Wrapper>
);

export default AdminConfirmationView;
