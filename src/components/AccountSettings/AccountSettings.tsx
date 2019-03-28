import * as React from 'react';

import * as supportIcon from '../../assets/Support.svg';

import { ButtonWrapper, Group, Heading, Info, InfoHeading, Wrapper } from './AccountSettings.css';

import { ROUTES } from '../Router/consts';

import Button, { ButtonLink } from '../Button';
import SvgIcon from '../SvgIcon';

interface Props {
  email: string;
  name: string;
  showSupport: () => void;
}

const AccountSettings = ({ email, name, showSupport }: Props) => (
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

      <Button onClick={showSupport} width={147}>
        <SvgIcon imgSrc={supportIcon} size={25} />
        Support
      </Button>
    </ButtonWrapper>
  </Wrapper>
);

export default AccountSettings;
