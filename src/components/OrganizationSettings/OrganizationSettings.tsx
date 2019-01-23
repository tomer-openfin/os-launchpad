import * as React from 'react';

import { Header, StyledRadioButton, Wrapper } from './OrganizationSettings.css';

import { OnOff } from '../../types/enums';

import LogoForm from '../LogoForm';
import ThemesForm from '../ThemesForm';

const ON_OFF_NAME = 'autologin-onoff';

interface Props {
  autoLoginOrg: boolean;
  setOrgAutoLogin: (autoLoginOrg: boolean) => void;
}

const OrganizationSettings = ({ autoLoginOrg, setOrgAutoLogin }: Props) => {
  const handleSetOrgAutoLogin = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setOrgAutoLogin(e.currentTarget.value === OnOff.On);
  };

  return (
    <Wrapper>
      <Header>Enterprise Branding</Header>

      <LogoForm />

      <Header>Enterprise Theme</Header>

      <ThemesForm />

      <Header>Allow Auto Login</Header>

      <StyledRadioButton onChange={handleSetOrgAutoLogin} checked={autoLoginOrg} name={ON_OFF_NAME} value={OnOff.On}>
        On
      </StyledRadioButton>

      <StyledRadioButton onChange={handleSetOrgAutoLogin} checked={!autoLoginOrg} name={ON_OFF_NAME} value={OnOff.Off}>
        Off
      </StyledRadioButton>

    </Wrapper>
  );
};

export default OrganizationSettings;
