import * as React from 'react';

import { Color } from '../../styles/index';

import Borders from '../Borders/index';
import Button, { ButtonLink } from '../Button';
import { ButtonWrapper, Copy, CopyWrapper, Error, Heading, HeadingText, Wrapper } from './AdminConfirmation.css';

interface Props {
  cancelCtaText?: string;
  confirmationText: string;
  confirmButtonDisabled?: boolean;
  confirmCtaText?: string;
  errorText?: string;
  handleConfirm?: () => void;
  headingText: string;
  height?: string;
  parentRoute: string;
  width?: string;
  withoutCancel?: boolean;
}

const AdminConfirmationView = ({
  cancelCtaText,
  confirmationText,
  confirmButtonDisabled,
  confirmCtaText,
  errorText,
  handleConfirm,
  headingText,
  height,
  parentRoute,
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
          <ButtonLink to={parentRoute} onClick={handleConfirm} width={153}>
            {confirmCtaText || 'Confirm'}
          </ButtonLink>
        ) : (
          <>
            <ButtonLink to={parentRoute} backgroundColor={Color.MERCURY} width={153}>
              {cancelCtaText || 'Cancel'}
            </ButtonLink>

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
