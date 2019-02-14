import * as React from 'react';

import { DirectionalPosition, LauncherSize, OnOff } from '../../types/commons';
import { ROUTES } from '../Router/consts';
import { Cta, Group, Heading, Row, StyledRadioButton, Wrapper } from './LauncherSettings.css';

import DirectionControls from '../DirectionControls';

const AUTO_HIDE_NAME = 'autohide-onoff';
const LAUNCHER_SIZE_NAME = 'launcherSize-options';

interface Props {
  autoHide: boolean;
  isChangeLauncherMonitorDisabled?: boolean;
  launcherSize: LauncherSize;
  launcherPosition: DirectionalPosition;
  setAutoHide: (autoHide: boolean) => void;
  setLauncherPosition: (launcherPosition: DirectionalPosition) => void;
  setLauncherSize: (launcherSize: LauncherSize) => void;
}

const LauncherSettings = ({
  autoHide,
  isChangeLauncherMonitorDisabled,
  launcherSize,
  launcherPosition,
  setAutoHide,
  setLauncherPosition,
  setLauncherSize,
}: Props) => {
  const handleAutoHide = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAutoHide(e.currentTarget.value === OnOff.On);
  };
  const handleLauncherSize = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setLauncherSize(e.currentTarget.value as LauncherSize);
  };

  return (
    <Wrapper>
      <Group>
        <Heading>Auto-Hide</Heading>

        <Row>
          <StyledRadioButton onChange={handleAutoHide} checked={!autoHide} name={AUTO_HIDE_NAME} value={OnOff.Off}>
            Off
          </StyledRadioButton>

          <StyledRadioButton onChange={handleAutoHide} checked={autoHide} name={AUTO_HIDE_NAME} value={OnOff.On}>
            On
          </StyledRadioButton>
        </Row>
      </Group>

      <Group>
        <Heading>Launcher Size</Heading>

        <Row>
          <StyledRadioButton onChange={handleLauncherSize} checked={launcherSize === LauncherSize.Small} name={LAUNCHER_SIZE_NAME} value={LauncherSize.Small}>
            Sm
          </StyledRadioButton>

          <StyledRadioButton onChange={handleLauncherSize} checked={launcherSize === LauncherSize.Large} name={LAUNCHER_SIZE_NAME} value={LauncherSize.Large}>
            Lg
          </StyledRadioButton>
        </Row>
      </Group>

      <Group>
        <Heading>Launcher Location</Heading>

        <Row>
          <DirectionControls direction={launcherPosition} handleChange={setLauncherPosition} />

          <Cta
            isDisabled={isChangeLauncherMonitorDisabled}
            onClick={
              isChangeLauncherMonitorDisabled
                ? e => {
                    e.preventDefault();
                  }
                : undefined
            }
            to={ROUTES.SETTINGS_LAUNCHER_MONITOR}
          >
            Change Screen
          </Cta>
        </Row>
      </Group>
    </Wrapper>
  );
};

export default LauncherSettings;
