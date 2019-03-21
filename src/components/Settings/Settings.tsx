import * as React from 'react';

import { SettingsWrapper, Window } from './Settings.css';

import noop from '../../utils/noop';

import AccountSettings from '../AccountSettings';
import Borders from '../Borders';
import ConfirmPasswordUpdate from '../ConfirmPasswordUpdate';
import LauncherSettings from '../LauncherSettings';
import Modal from '../Modal';
import MonitorControlsDialog, { asRoute as asMonitorControlsDialogRoute, withLauncherConfig } from '../MonitorControlsDialog';
import Support from '../Support';
import UpdatePasswordForm from '../UpdatePasswordForm';
import WindowHeader from '../WindowHeader';

export enum Stage {
  Confirm = 'confirm-password',
  ContactSupport = 'contact-support',
  Default = 'default',
  LauncherMonitor = 'launcher-monitor',
  PasswordUpdate = 'update-password',
}

export interface Props {
  currentAction?: string;
  handleClose: () => void;
  handleConfirm: () => void;
  hideWindow?: () => void;
  isEnterprise?: boolean;
}

const wrappedMonitorControls = asMonitorControlsDialogRoute(withLauncherConfig(MonitorControlsDialog));

const Settings = ({ currentAction, handleClose, handleConfirm, hideWindow, isEnterprise }: Props) => {
  const createHandleClose = !handleClose ? noop : handleClose;

  return (
    <Window>
      <Borders height="100%" width="100%">
        <WindowHeader handleClose={hideWindow}>My Settings</WindowHeader>

        <SettingsWrapper>
          <LauncherSettings />

          {isEnterprise && <AccountSettings />}
        </SettingsWrapper>

        {currentAction === Stage.LauncherMonitor && <Modal handleClose={createHandleClose}>{wrappedMonitorControls()}</Modal>}

        {currentAction === Stage.PasswordUpdate && (
          <Modal handleClose={createHandleClose}>
            <UpdatePasswordForm handleCancel={handleClose} handleConfirm={handleConfirm} handleSuccess={handleClose} />
          </Modal>
        )}

        {currentAction === Stage.ContactSupport && (
          <Modal handleClose={createHandleClose}>
            <Support handleClose={handleClose} referenceNumber="2" handleSubmit={() => {}} />
          </Modal>
        )}

        {currentAction === Stage.Confirm && (
          <Modal handleClose={createHandleClose}>
            <ConfirmPasswordUpdate handleSuccess={handleClose} />
          </Modal>
        )}
      </Borders>
    </Window>
  );
};

export default Settings;
