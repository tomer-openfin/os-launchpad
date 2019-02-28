import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { SETTINGS_ROUTES } from '../Router/consts';
import { SettingsWrapper, Window } from './Settings.css';

import AccountSettings from '../AccountSettings';
import Borders from '../Borders';
import LauncherSettings from '../LauncherSettings';
import Modal from '../Modal';
import WindowHeader from '../WindowHeader';

interface Props {
  children?: React.ReactNode;
  hideWindow: () => void;
  history?: RouteComponentProps['history'];
  isEnterprise: boolean;
  location?: RouteComponentProps['location'];
}

const SETTINGS_PATHS = Object.values(SETTINGS_ROUTES);

const Settings = (props: Props) => {
  const { children, hideWindow, history, isEnterprise, location } = props;

  return (
    <Window>
      <Borders height="100%" width="100%">
        <WindowHeader handleClose={hideWindow}>My Settings</WindowHeader>

        <SettingsWrapper>
          <LauncherSettings />

          {isEnterprise && <AccountSettings />}
        </SettingsWrapper>

        {location && history && doesCurrentPathMatch(SETTINGS_PATHS, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
      </Borders>
    </Window>
  );
};

export default Settings;
