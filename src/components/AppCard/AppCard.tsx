import * as React from 'react';

import { AppDescription, AppName, CTAWrapper, IconWrapper, InfoWrapper, Wrapper } from './AppCard.css';

import { App } from '../../types/commons';

import AppIcon from '../AppIcon';
import Loading from '../Loading';

export interface Props {
  app: App;
  ctas?: React.ReactNode;
  isLoading?: boolean;
  launchApp?: (app: App) => void;
}

const defaultProps = {
  isLoading: false,
};

const AppCard = ({ app, isLoading = defaultProps.isLoading, ctas, launchApp }: Props) => {
  const handleClick = launchApp ? () => launchApp(app) : undefined;

  return (
    <Wrapper isLoading={isLoading}>
      <IconWrapper>
        <AppIcon imgSrc={app.icon} isLoading={isLoading} onClick={handleClick} />

        {isLoading && <Loading size={15} />}
      </IconWrapper>

      <InfoWrapper>
        <AppName isLoading={isLoading} onClick={handleClick}>
          {app.title}
        </AppName>

        <AppDescription title={`${app.description}`}>{app.description}</AppDescription>
      </InfoWrapper>

      <CTAWrapper>{ctas}</CTAWrapper>
    </Wrapper>
  );
};

export default AppCard;
