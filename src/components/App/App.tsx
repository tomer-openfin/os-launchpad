import * as React from 'react';

import { App, DirectionalPosition } from '../../types/commons';
import IconSpace from '../IconSpace';
import Logo from '../Logo';
import { Separator, StyledAppIcon, Wrapper } from './App.css';

interface LauncherIcon {
  cta: () => void;
  icon: string;
  key: string;
}

export interface Props {
  apps: App[];
  launcherPosition: DirectionalPosition;
  icons: LauncherIcon[];
}

const App = (props: Props) => {
  const { apps, launcherPosition, icons } = props;

  return (
    <Wrapper launcherPosition={launcherPosition}>
      <Logo />

      {apps.map(app => (
        <React.Fragment key={app.id}>
          <Separator launcherPosition={launcherPosition} />

          <StyledAppIcon launcherPosition={launcherPosition} appId={app.id} withContextMenu />
        </React.Fragment>
      ))}

      {icons.map(icon => (
        <React.Fragment key={icon.key}>
          <Separator launcherPosition={launcherPosition} />

          <IconSpace hover iconImg={icon.icon} onClick={icon.cta} />
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default App;
