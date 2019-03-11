import * as React from 'react';

import { ButtonWrapper, Group, Heading, Info, InfoHeading, Wrapper } from './AccountSettings.css';

import { ROUTES } from '../Router/consts';

import { ButtonLink } from '../Button';

interface Props {
  email: string;
  name: string;
}

const AccountSettings = ({ email, name }: Props) => (
  <Wrapper>
    <Heading>Account Info</Heading>

    <Group>
      <InfoHeading>Email</InfoHeading>

      <Info>{email}</Info>
    </Group>

    <Group>
      <InfoHeading>Name</InfoHeading>

      <Info>{name}</Info>
    </Group>

    <ButtonWrapper>
      <ButtonLink to={ROUTES.SETTINGS_UPDATE_PASSWORD} width={147}>
        Change Password
      </ButtonLink>
    </ButtonWrapper>
  </Wrapper>
);

export default AccountSettings;
