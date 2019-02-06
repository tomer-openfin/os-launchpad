import * as React from 'react';

import Borders from '../Borders';
import { ButtonLink } from '../Button';
import { Copy, CopyWrapper, Heading, HeadingText } from '../ConfirmUserDelete/ConfirmDelete.css';
import { ROUTES } from '../Router/consts';
import { ButtonWrapper, Wrapper } from './ConfirmPasswordUpdate.css';

const ConfirmPasswordUpdate = () => {
  return (
    <Wrapper>
      <Borders height="100%" width="100%">
        <Heading>
          <HeadingText>Password Updated</HeadingText>
        </Heading>

        <CopyWrapper>
          <Copy>Your password has been successfully updated. You are still logged in, but will need to use your new password the next time you log in.</Copy>
        </CopyWrapper>

        <ButtonWrapper>
          <ButtonLink to={ROUTES.SETTINGS} width={153}>
            Ok
          </ButtonLink>
        </ButtonWrapper>
      </Borders>
    </Wrapper>
  );
};

export default ConfirmPasswordUpdate;
