import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DirectionalPosition, LauncherSize, OnOff } from '../../types/commons';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ButtonLink } from '../Button/Button.css';
import { ROUTES, SETTINGS_ROUTES } from '../Router/consts';
import { ButtonWrapper, CTA, Group, Heading, Row, Section, StyledRadioButton, Window } from './Settings.css';

import Borders from '../Borders';
import Modal from '../Modal';
import WindowHeader from '../WindowHeader';

const AUTO_HIDE_NAME = 'autohide-onoff';
const LAUNCHER_SIZE_NAME = 'launcherSize-options';

interface Props extends RouteComponentProps {
  autoHide: boolean;
  isEnterprise: boolean;
  hideWindow: () => void;
  launcherSize: LauncherSize;
  onEscDown: () => void;
  setAutoHide: (autoHide: boolean) => void;
  setLauncherPosition: (launcherPosition: DirectionalPosition) => void;
  setLauncherSize: (launcherSize: LauncherSize) => void;
}

const SETTINGS_PATHS = Object.values(SETTINGS_ROUTES);

// defaultProps needed for Settings.story to not complain about missing history prop
const defaultProps: Partial<Props> = {};

class Settings extends React.Component<Props, {}> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);
  }

  render() {
    const { autoHide, children, isEnterprise, history, hideWindow, setAutoHide, setLauncherPosition, setLauncherSize, launcherSize } = this.props;

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
        <Borders height="100%" width="100%">
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

          {isEnterprise && (
            <ButtonWrapper>
              <ButtonLink to={ROUTES.SETTINGS_UPDATE} width={147}>
                Change Password
              </ButtonLink>
            </ButtonWrapper>
          )}

          {doesCurrentPathMatch(SETTINGS_PATHS, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
        </Borders>
      </Window>
    );
  }
}

export default Settings;
