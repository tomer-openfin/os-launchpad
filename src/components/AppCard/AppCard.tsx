import * as React from 'react';

import { AppDescription, AppName, CTA, InfoWrapper, Row, Wrapper } from './AppCard.css';

import { App } from '../../types/commons';

import IconSpace from '../IconSpace';

interface Props {
  addToLauncher: (id: string) => void;
  app: App;
  isLauncherApp: boolean;
  removeFromLauncher: (id: string) => void;
  launchApp: (app: App) => void;
}

const renderCTAText = (isLauncherApp: boolean) => (isLauncherApp ? '- Remove Shortcut' : '+ Add Shortcut');

const AppCard = ({ addToLauncher, app, isLauncherApp, launchApp, removeFromLauncher }: Props) => {
  const handleClick = () => launchApp(app);

  return (
    <Wrapper>
      <IconSpace onClick={handleClick} iconImg={app.icon} large />

      <InfoWrapper>
        <Row>
          <AppName onClick={handleClick}>{app.name}</AppName>

          <CTA onClick={isLauncherApp ? () => removeFromLauncher(`${app.id}`) : () => addToLauncher(`${app.id}`)}>{renderCTAText(isLauncherApp)}</CTA>
        </Row>

        <AppDescription>{app.description}</AppDescription>
      </InfoWrapper>
    </Wrapper>
  );
};

export default AppCard;
