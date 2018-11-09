import * as React from 'react';

import config from '../../config/windows';
import { App } from '../../redux/apps/types';
import { WindowConfig } from '../../redux/windows/types';

import * as plusIcon from '../../assets/AddApp.svg';

import createFromManifest from '../../utils/createFromManifest';
import IconSpace from '../IconSpace';
import { CloseButton, Space, Wrapper } from './AppList.css';

const handleClickCreator = (manifestUrl: string, altFn: () => void) => {
  if (!manifestUrl) return altFn;

  return () => createFromManifest(manifestUrl);
};

// Spaces takes a number of spaces
// and returns a function to render that number of spaces
/* tslint:disable-next-line:ban Array constructor is here used properly, with a single argument for length https://eslint.org/docs/rules/no-array-constructor */
const renderSpaces = (spaceCount: number) => (mapFn: (item, index: number) => JSX.Element) => Array.from(Array(spaceCount).keys()).map(mapFn);

interface Props {
  removeFromLauncher: (id: string) => void;
  launcherPosition: string;
  appList: App[];
  launchWindowCreator: (window: WindowConfig) => () => void;
  spaceCount?: number;
}

const AppList = ({ appList, launchWindowCreator, launcherPosition, removeFromLauncher, spaceCount }: Props) => {
  // we either render the spaceCount passed in or,
  // if that is falsy we render the number of apps in your list plus 1 for a final plusIcon
  const spaces = spaceCount ? spaceCount : appList.length + 1;
  return (
    <Wrapper launcherPosition={launcherPosition}>
      {renderSpaces(spaces)((item, index) => {
        const app = appList[index];

        return app ? (
          <Space key={app.manifest_url || index} withClose >
            <IconSpace
              onClick={handleClickCreator(app.manifest_url, launchWindowCreator(config.appDirectory))}
              iconImg={app ? app.icon : plusIcon}
            />

            {/* tslint:disable:jsx-no-lambda */}
            <CloseButton onClick={() => removeFromLauncher(`${app.id}`)} />
          </Space>
        ) : (
          <Space key={index} >
            <IconSpace onClick={launchWindowCreator(config.appDirectory)} iconImg={plusIcon} hover />
          </Space>
        );
      })}
    </Wrapper>
  );
};

export default AppList;
