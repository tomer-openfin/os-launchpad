import * as React from 'react';

import * as plusIcon from '../../assets/AddApp.svg';

import config from '../../config/windows';
import { closeFinAppRequest, openFinAppRequest } from '../../redux/apps';
import { AppStatus, AppStatusTypes } from '../../redux/apps/types';
import { ContextMenuOption } from '../../redux/contextMenu/types';
import { removeFromAppLauncher } from '../../redux/me';
import { WindowConfig } from '../../redux/windows/types';
import { App, LauncherPosition } from '../../types/commons';

import ContextMenuZone from '../ContextMenuZone';
import IconSpace from '../IconSpace';
import { CloseButton, Space, Wrapper } from './AppList.css';

const handleClickCreator = (app: App, fn: (app: App) => void, altFn: () => void) => {
  if (!app.manifest_url) return altFn;

  return () => fn(app);
};

// Spaces takes a number of spaces
// and returns a function to render that number of spaces
/* tslint:disable-next-line:ban Array constructor is here used properly, with a single argument for length https://eslint.org/docs/rules/no-array-constructor */
const renderSpaces = (spaceCount: number) => (mapFn: (item, index: number) => JSX.Element) => Array.from(Array(spaceCount).keys()).map(mapFn);

interface Props {
  appList: App[];
  appsStatusByName: AppStatus;
  launchApp: (App: App) => void;
  launcherPosition: LauncherPosition;
  launchWindowCreator: (window: WindowConfig) => () => void;
  removeFromLauncher: (id: string) => void;
  spaceCount?: number;
}

const AppList = ({ appList, appsStatusByName, launchApp, launchWindowCreator, launcherPosition, removeFromLauncher, spaceCount }: Props) => {
  // we either render the spaceCount passed in or,
  // if that is falsy we render the number of apps in your list plus 1 for a final plusIcon
  const spaces = spaceCount ? spaceCount : appList.length + 1;
  return (
    <Wrapper launcherPosition={launcherPosition}>
      {renderSpaces(spaces)((item, index) => {
        const app = appList[index];

        if (!app) {
          return (
            <Space key={index}>
              <IconSpace onClick={launchWindowCreator(config.appDirectory)} iconImg={plusIcon} hover />
            </Space>
          );
        }

        const handleClose = () => removeFromLauncher(`${app.id}`);
        const appStatus = appsStatusByName[app.name];
        const contextMenuOptions: ContextMenuOption[] = [{ label: 'Remove Shortcut', action: removeFromAppLauncher(`${app.id}`) }];
        if (!appStatus || appStatus.state === AppStatusTypes.Closed) {
          contextMenuOptions.unshift({ label: 'Open', action: openFinAppRequest(app) });
        }
        if (appStatus && appStatus.state === AppStatusTypes.Running && appStatus.uuid) {
          contextMenuOptions.unshift({ label: 'Close', action: closeFinAppRequest({ uuid: appStatus.uuid }) });
        }

        return (
          <Space key={app.manifest_url || index} withClose>
            <ContextMenuZone options={contextMenuOptions}>
              <IconSpace onClick={handleClickCreator(app, launchApp, launchWindowCreator(config.appDirectory))} iconImg={app ? app.icon : plusIcon} />

              <CloseButton onClick={handleClose} />
            </ContextMenuZone>
          </Space>
        );
      })}
    </Wrapper>
  );
};

export default AppList;
