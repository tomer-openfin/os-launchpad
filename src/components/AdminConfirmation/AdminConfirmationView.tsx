import * as React from 'react';

import Color from '../../styles/color';
import { ButtonWrapper, Copy, CopyWrapper, Error, Heading, HeadingText, Wrapper } from './AdminConfirmation.css';

import Borders from '../Borders';
import Button from '../Button';
import Loading from '../Loading';

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
            <Button onClick={handleCancel} backgroundColor={Color.MERCURY} width={153}>
              {cancelCtaText || 'Cancel'}
            </Button>

            <Button disabled={confirmButtonDisabled} onClick={handleConfirm} width={153}>
              {confirmButtonDisabled ? <Loading size={15} /> : confirmCtaText || 'Confirm'}
            </Button>
          </>
        )}
      </ButtonWrapper>

      <Error shown={!!errorText}>{errorText}</Error>
    </Borders>
  </Wrapper>
);

export default AdminConfirmationView;
