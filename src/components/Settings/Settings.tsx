import * as React from 'react';

import { DirectionalPosition, OnOff } from '../../types/commons';

import WindowHeader from '../WindowHeader';
import { CTA, Heading, Row, Section, StyledRadioButton, Window } from './Settings.css';

const ON_OFF_NAME = 'autohide-onoff';

interface Props {
  autoHide: boolean;
  hideWindow: () => void;
  setAutoHide: (autoHide: boolean) => void;
  setLaunchbarPosition: (launcherPosition: DirectionalPosition) => void;
  onEscDown: () => void;
}

class Settings extends React.Component<Props, {}> {
  render() {
    const { autoHide, hideWindow, setAutoHide, setLaunchbarPosition } = this.props;

    const setLauncherPositionTop = () => setLaunchbarPosition(DirectionalPosition.Top);
    const setLauncherPositionLeft = () => setLaunchbarPosition(DirectionalPosition.Left);
    const setLauncherPositionRight = () => setLaunchbarPosition(DirectionalPosition.Right);
    const setLauncherPositionBottom = () => setLaunchbarPosition(DirectionalPosition.Bottom);
    const handleAutoHide = (e: React.SyntheticEvent<HTMLInputElement>) => {
      setAutoHide(e.currentTarget.value === OnOff.On);
    };

    return (
      <Window>
        <WindowHeader handleClose={hideWindow} >My Settings</WindowHeader>

        <Section>
          <Heading>Auto-Hide</Heading>

          <Row>
            <StyledRadioButton onChange={handleAutoHide} checked={autoHide} name={ON_OFF_NAME} value={OnOff.On}>
              On
            </StyledRadioButton>

            <StyledRadioButton onChange={handleAutoHide} checked={!autoHide} name={ON_OFF_NAME} value={OnOff.Off}>
              Off
            </StyledRadioButton>
          </Row>
        </Section>

        <Section>
          <Heading>Launcher Position</Heading>

          <CTA onClick={setLauncherPositionTop}>Top</CTA>

          <Row>
            <CTA onClick={setLauncherPositionLeft}>Left</CTA>

            <CTA onClick={setLauncherPositionRight}>Right</CTA>
          </Row>

          <CTA onClick={setLauncherPositionBottom}>Bottom</CTA>
        </Section>
      </Window>
    );
  }
}

export default Settings;
