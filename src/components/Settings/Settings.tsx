import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import noop from '../../utils/noop';

import WindowHeader from '../WindowHeader';
import { CTA, Heading, Row, Section, Window } from './Settings.css';

interface Props {
  autoHide: boolean;
  setAutoHide;
  setLaunchbarPosition;
  onEscDown: () => void;
}

const defaultProps: Props = {
  autoHide: false,
  onEscDown: noop,
  setAutoHide: noop,
  setLaunchbarPosition: noop,
};

class Settings extends React.Component<Props, {}> {
  static defaultProps = defaultProps;

  render() {
    const { autoHide, setAutoHide, setLaunchbarPosition } = this.props;

    const setLauncherPositionTop = () => setLaunchbarPosition(DirectionalPosition.Top);
    const setLauncherPositionLeft = () => setLaunchbarPosition(DirectionalPosition.Left);
    const setLauncherPositionRight = () => setLaunchbarPosition(DirectionalPosition.Right);
    const setLauncherPositionBottom = () => setLaunchbarPosition(DirectionalPosition.Bottom);
    const handleAutoHide = () => {
      autoHide ? setAutoHide(false) : setAutoHide(true);
    };

    return (
      <Window>
        <WindowHeader>My Settings</WindowHeader>

        <Section>
          <Heading>Auto Hide</Heading>

          <CTA onClick={handleAutoHide}>{autoHide ? 'ON' : 'OFF'}</CTA>
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
