import * as React from 'react';

import config from '../../config/windows';
import { App } from '../../redux/apps/types';
import { WindowConfig } from '../../redux/windows/types';

import * as plusIcon from '../../assets/AddApp.svg';
import * as allAppsIcon from '../../assets/blot.svg';

import IconSpace from '../IconSpace';
import { Wrapper } from './AppList.css';

const handleClickCreator = (manifestUrl: string, altFn: () => void) => {
  if (!manifestUrl) return altFn;

  return () => {
    window.fin.desktop.Application.createFromManifest(
      manifestUrl,
      (createdApp: fin.OpenFinApplication): void => {
        createdApp.run(
          (): void => {
            /* tslint:disable-next-line:no-console */
            console.info('Launched Successfully: ', createdApp);
          },
          (): void => {
            /* tslint:disable-next-line:no-console */
            console.info('Launch Error: ', createdApp);
          },
        );
      },
    );
  };
};

/* tslint:disable-next-line:ban Array constructor is here used properly, with a single argument for length https://eslint.org/docs/rules/no-array-constructor */
const spaces = (spaceCount: number = 3, mapFn: (item, index: number) => JSX.Element) => Array.from(Array(spaceCount).keys()).map(mapFn);

interface Props {
  launcherPosition: string;
  appList: App[];
  launchWindowCreator: (window: WindowConfig) => () => void;
}

const AppList = ({ appList, launchWindowCreator, launcherPosition }: Props) => (
  <Wrapper launcherPosition={launcherPosition}>
    {spaces(4, (item, index) => {
      const app = appList[index];

      return app ? (
        <IconSpace
          key={app.manifest_url || index}
          onClick={handleClickCreator(app.manifest_url, launchWindowCreator(config.appDirectory))}
          iconImg={app ? app.icon : plusIcon}
        />
      ) : (
        <IconSpace key={index} onClick={launchWindowCreator(config.appDirectory)} iconImg={plusIcon} />
      );
    })}

    <IconSpace iconImg={allAppsIcon} />
  </Wrapper>
);

export default AppList;
