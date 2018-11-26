import * as React from 'react';

import { Header, Separator, Wrapper } from './OrganizationSettings.css';

import LogoForm from '../LogoForm';
import ThemesForm from '../ThemesForm';

const OrganizationSettings = () => (
  <Wrapper>
    <Header>Set Logo</Header>

    <LogoForm />

    <Separator />

    <Header>Set Theme</Header>

    {/* TODO: (chenghw) Figure out how to properly type HOC to omit props */}
    <ThemesForm themes={[]} />
  </Wrapper>
);

export default OrganizationSettings;
