import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DirectionalPosition, LauncherSize, OnOff } from '../../types/commons';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ButtonLink } from '../Button';
import { ROUTES, SETTINGS_ROUTES } from '../Router/consts';
import { ButtonWrapper, Content, Cta, Group, Heading, Row, Section, StyledRadioButton, Window } from './Settings.css';

import Borders from '../Borders';
import DirectionControls from '../DirectionControls';
import Modal from '../Modal';
import WindowHeader from '../WindowHeader';

const AUTO_HIDE_NAME = 'autohide-onoff';
const LAUNCHER_SIZE_NAME = 'launcherSize-options';

interface Props {
  autoHide: boolean;
  children?: React.ReactNode;
  hideWindow: () => void;
  history?: RouteComponentProps['history'];
  isChangeLauncherMonitorDisabled?: boolean;
  isEnterprise: boolean;
  launcherPosition: DirectionalPosition;
  launcherSize: LauncherSize;
  location?: RouteComponentProps['location'];
  setAutoHide: (autoHide: boolean) => void;
  setLauncherPosition: (launcherPosition: DirectionalPosition) => void;
  setLauncherSize: (launcherSize: LauncherSize) => void;
}

const SETTINGS_PATHS = Object.values(SETTINGS_ROUTES);

const Settings = (props: Props) => {
  const {
    autoHide,
    children,
    hideWindow,
    history,
    isChangeLauncherMonitorDisabled,
    isEnterprise,
    launcherPosition,
    launcherSize,
    location,
    setAutoHide,
    setLauncherPosition,
    setLauncherSize,
  } = props;

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

        <Content>
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
          </Section>

          {isEnterprise && (
            <ButtonWrapper>
              <ButtonLink to={ROUTES.SETTINGS_UPDATE_PASSWORD} width={147}>
                Change Password
              </ButtonLink>
            </ButtonWrapper>
          )}
        </Content>

        {location && history && doesCurrentPathMatch(SETTINGS_PATHS, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
      </Borders>
    </Window>
  );
};

export default Settings;
