/* tslint:disable:jsx-no-lambda */

import * as React from 'react';

import { CTA, Heading, Section, Window } from './Settings.css';

import noop from '../../utils/noop';

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

    return (
      <Window>
        <Section>
          <Heading>Auto Hide</Heading>

          <CTA onClick={() => (autoHide ? setAutoHide(false) : setAutoHide(true))}>{autoHide ? 'ON' : 'OFF'}</CTA>
        </Section>

        <Section>
          <Heading>Launcher Position</Heading>

          <CTA onClick={() => setLaunchbarPosition('TOP')}>Top</CTA>

          <div>
            <CTA onClick={() => setLaunchbarPosition('LEFT')}>Left</CTA>

            <CTA onClick={() => setLaunchbarPosition('RIGHT')}>Right</CTA>
          </div>

          <CTA onClick={() => setLaunchbarPosition('BOTTOM')}>Bottom</CTA>
        </Section>
      </Window>
    );
  }
}

export default AppOverflow;
