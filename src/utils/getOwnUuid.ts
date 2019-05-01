import { Identity } from '../types/fin';

const MAIN_WINDOW = 'osLaunchpadMain';

const getOwnUuid = () => {
  const { fin } = window;
  if (!fin) {
    return process.env.APP_UUID || MAIN_WINDOW;
  }

  return fin.desktop.Application.getCurrent().uuid;
};

export const getOwnIdentity = (): Identity => {
  const { fin } = window;
  if (!fin) {
    return { uuid: getOwnUuid(), name: window.name };
  }

  const finWindow = fin.desktop.Window.getCurrent();
  return { uuid: finWindow.uuid, name: finWindow.name };
};

export default getOwnUuid;
