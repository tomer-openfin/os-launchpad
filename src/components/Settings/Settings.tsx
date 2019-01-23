import * as React from 'react';

import { DirectionalPosition, LauncherSize, OnOff } from '../../types/commons';

import WindowHeader from '../WindowHeader';
import { CTA, Group, Heading, Row, Section, StyledRadioButton, Window } from './Settings.css';

const AUTO_HIDE_NAME = 'autohide-onoff';
const LAUNCHER_SIZE_NAME = 'launcherSize-options';

interface Props {
  autoHide: boolean;
  hideWindow: () => void;
  launcherSize: LauncherSize;
  onEscDown: () => void;
  setAutoHide: (autoHide: boolean) => void;
  setLauncherPosition: (launcherPosition: DirectionalPosition) => void;
  setLauncherSize: (launcherSize: LauncherSize) => void;
}

class Settings extends React.Component<Props> {
  render() {
    const { autoHide, hideWindow, launcherSize, setAutoHide, setLauncherPosition, setLauncherSize } = this.props;

    const setLauncherPositionTop = () => setLauncherPosition(DirectionalPosition.Top);
    const setLauncherPositionLeft = () => setLauncherPosition(DirectionalPosition.Left);
    const setLauncherPositionRight = () => setLauncherPosition(DirectionalPosition.Right);
    const setLauncherPositionBottom = () => setLauncherPosition(DirectionalPosition.Bottom);
    const handleAutoHide = (e: React.SyntheticEvent<HTMLInputElement>) => {
      setAutoHide(e.currentTarget.value === OnOff.On);
    };
    const handleLauncherSize = (e: React.SyntheticEvent<HTMLInputElement>) => {
      setLauncherSize(e.currentTarget.value as LauncherSize);
    };

    return (
      <Window>
        <WindowHeader handleClose={hideWindow}>My Settings</WindowHeader>

        <Section>
          <Group>
            <Heading>Auto-Hide</Heading>

            <Row>
              <StyledRadioButton onChange={handleAutoHide} checked={autoHide} name={AUTO_HIDE_NAME} value={OnOff.On}>
                On
              </StyledRadioButton>

              <StyledRadioButton onChange={handleAutoHide} checked={!autoHide} name={AUTO_HIDE_NAME} value={OnOff.Off}>
                Off
              </StyledRadioButton>
            </Row>
          </Group>

          <Group>
            <Heading>Launcher Size</Heading>

            <Row>
              <StyledRadioButton
                onChange={handleLauncherSize}
                checked={launcherSize === LauncherSize.Small}
                name={LAUNCHER_SIZE_NAME}
                value={LauncherSize.Small}
              >
                Sm
              </StyledRadioButton>

              <StyledRadioButton
                onChange={handleLauncherSize}
                checked={launcherSize === LauncherSize.Large}
                name={LAUNCHER_SIZE_NAME}
                value={LauncherSize.Large}
              >
                Lg
              </StyledRadioButton>
            </Row>
          </Group>
        </Section>

        <Section>
          <Group>
            <Heading>Launcher Position</Heading>

            <CTA onClick={setLauncherPositionTop}>Top</CTA>

            <Row>
              <CTA onClick={setLauncherPositionLeft}>Left</CTA>

              <CTA onClick={setLauncherPositionRight}>Right</CTA>
            </Row>

            <CTA onClick={setLauncherPositionBottom}>Bottom</CTA>
          </Group>
        </Section>
      </Window>
    );
  }
}

export default Settings;
