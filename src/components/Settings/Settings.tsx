import * as React from 'react';

import { LauncherPosition } from '../../types/commons';
import noop from '../../utils/noop';

import WindowHeader from '../WindowHeader';
import { CTA, Heading, Section, Window } from './Settings.css';

interface Props {
  autoHide: boolean;
  setAutoHide;
  setLaunchbarPosition;
}

const defaultProps: Props = {
  autoHide: false,
  setAutoHide: noop,
  setLaunchbarPosition: noop,
};

class AppOverflow extends React.Component<Props, {}> {
  static defaultProps = defaultProps;

  render() {
    const { autoHide, setAutoHide, setLaunchbarPosition } = this.props;

    const setLauncherPositonTop = () => setLaunchbarPosition(LauncherPosition.Top);
    const setLauncherPositonLeft = () => setLaunchbarPosition(LauncherPosition.Left);
    const setLauncherPositonRight = () => setLaunchbarPosition(LauncherPosition.Right);
    const setLauncherPositonBottom = () => setLaunchbarPosition(LauncherPosition.Bottom);
    const handleAutoHide = () => {
      autoHide ? setAutoHide(false) : setAutoHide(true);
    };

    return (
      <Window>
        <WindowHeader />

        <Section>
          <Heading>Auto Hide</Heading>

          <CTA onClick={handleAutoHide}>{autoHide ? 'ON' : 'OFF'}</CTA>
        </Section>

        <Section>
          <Heading>Launcher Position</Heading>

          <CTA onClick={setLauncherPositonTop}>Top</CTA>

          <div>
            <CTA onClick={setLauncherPositonLeft}>Left</CTA>

            <CTA onClick={setLauncherPositonRight}>Right</CTA>
          </div>

          <CTA onClick={setLauncherPositonBottom}>Bottom</CTA>
        </Section>
      </Window>
    );
  }
}

export default AppOverflow;
