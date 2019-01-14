import * as React from 'react';

import { AppDescription, AppName, CTAWrapper, IconWrapper, InfoWrapper, Wrapper } from './AppCard.css';

import { App } from '../../types/commons';

import AppIcon from '../AppIcon';

interface Props {
  app: App;
  ctas?: React.ReactNode;
  launchApp: (app: App) => void;
}

const AppCard = ({ app, ctas, launchApp }: Props) => {
  const handleClick = () => launchApp(app);

  return (
    <Wrapper>
      <IconWrapper>
        <AppIcon imgSrc={app.icon} onClick={handleClick} />
      </IconWrapper>

      <InfoWrapper>
        <AppName onClick={handleClick}>{app.title}</AppName>

        <AppDescription>{app.description}</AppDescription>
      </InfoWrapper>

      <CTAWrapper>{ctas}</CTAWrapper>
    </Wrapper>
  );
};

export default AppCard;
