import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
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

    const setLauncherPositionTop = () => setLaunchbarPosition(DirectionalPosition.Top);
    const setLauncherPositionLeft = () => setLaunchbarPosition(DirectionalPosition.Left);
    const setLauncherPositionRight = () => setLaunchbarPosition(DirectionalPosition.Right);
    const setLauncherPositionBottom = () => setLaunchbarPosition(DirectionalPosition.Bottom);
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

          <CTA onClick={setLauncherPositionTop}>Top</CTA>

          <div>
            <CTA onClick={setLauncherPositionLeft}>Left</CTA>

            <CTA onClick={setLauncherPositionRight}>Right</CTA>
          </div>

          <CTA onClick={setLauncherPositionBottom}>Bottom</CTA>
        </Section>
      </Window>
    );
  }
}

export default AppOverflow;
