import * as React from 'react';

import { AppIcon, Wrapper } from './';
import AppData from './AppData';

const handleClickCreator = (manifestUrl: string) => () => {
  /* tslint:disable:no-console */
  console.log('manifestUrl', manifestUrl, '\n');

  window.fin.desktop.Application.createFromManifest(
    manifestUrl,
    (createdApp: fin.OpenFinApplication): void => {
      createdApp.run(
        (): void => {
          console.info('Launched Successfully: ', createdApp);
        },
        (): void => {
          console.info('Launch Error: ', createdApp);
        },
      );
    },
  );
};

const AppList = ({}) =>
  <Wrapper>{AppData.map(app => <AppIcon onClick={handleClickCreator(app.manifest_url)} key={app.manifest_url} src={app.icon} />)}</Wrapper>;

export default AppList;
