import * as React from 'react';

import { App } from '../../redux/apps';

import * as close from '../../assets/close-x-grey.svg';

import noop from '../../utils/noop';
import IconSpace from '../IconSpace/IconSpace';
import {
  AppCard,
  AppCardRowWrapper,
  AppDescription,
  AppName,
  Directory,
  Heading,
  ToggleButtonWrapper,
  Tooltip,
  WithTooltip,
  Wrapper,
} from './AppDirectory.css';

interface Props {
  addToLauncher: (id: string) => void;
  appList: App[];
  launcherAppIds: string[];
  removeFromLauncher: (id: string) => void;
}

const defaultProps: Props = {
  addToLauncher: noop,
  appList: [],
  launcherAppIds: [],
  removeFromLauncher: noop,
};

const AppDirectory = ({ addToLauncher, appList, launcherAppIds, removeFromLauncher }: Props) => (
  <Wrapper>
    <Heading>{/* <IconSpace iconImg={appsIcon} draggable /> */}</Heading>

    <Directory>
      {appList
        .slice(0, 5)
        .concat(appList.concat(appList))
        .map((app: App, index) => {
          const isLauncherApp = launcherAppIds.indexOf(`${app.id}`) !== -1;

          return (
            <WithTooltip key={app.name + index}>
              <IconSpace iconImg={app.icon} large />

              <Tooltip>
                <AppCard>
                  <AppCardRowWrapper>
                    <IconSpace iconImg={app.icon} large />

                    <ToggleButtonWrapper rotated={!isLauncherApp}>
                      <IconSpace iconImg={close} onClick={isLauncherApp ? () => removeFromLauncher(`${app.id}`) : () => addToLauncher(`${app.id}`)} />
                    </ToggleButtonWrapper>
                  </AppCardRowWrapper>

                  <AppCardRowWrapper>
                    <AppName>{app.name}</AppName>

                    <AppDescription>{app.description}</AppDescription>
                  </AppCardRowWrapper>
                </AppCard>
              </Tooltip>
            </WithTooltip>
          );
        })}
    </Directory>
  </Wrapper>
);

AppDirectory.defaultProps = defaultProps;

export default AppDirectory;
