import * as React from 'react';

import * as Exclamation from '../../assets/Exclamation.svg';

import { Color } from '../../styles';
import { AppStatusStates, DirectionalPosition, LauncherSize } from '../../types/enums';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { Indicator, StyledSvgIcon } from './AppIndicator.css';

export interface Props {
  appStatusState: AppStatusStates;
  className?: string;
  message?: string;
  position: DirectionalPosition;
  size?: number;
}

const defaultProps = {
  size: launcherSizeConfigs[LauncherSize.Large].appIndicator,
};

const AppIndicator = (props: Props) => {
  const { appStatusState, className, message, position, size = defaultProps.size } = props;

  return (
    <Indicator appStatusState={appStatusState} className={className} position={position} size={size} title={message}>
      <StyledSvgIcon color={props.appStatusState === AppStatusStates.Error ? Color.SUN : Color.VOID} imgSrc={Exclamation} size="53%" />
    </Indicator>
  );
};

export default AppIndicator;
