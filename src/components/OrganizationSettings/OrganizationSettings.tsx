import * as React from 'react';

import { Header, Wrapper } from './OrganizationSettings.css';

import LogoForm from '../LogoForm';
import ThemesForm from '../ThemesForm';

const OrganizationSettings = () => (
  <Wrapper>
    <Header>Enterprise Branding</Header>

    <LogoForm />

    <Header>Enterprise Theme</Header>

    <ThemesForm />
  </Wrapper>
);

export default OrganizationSettings;
