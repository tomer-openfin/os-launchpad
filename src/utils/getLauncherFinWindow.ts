import getOwnUuid from './getOwnUuid';

export const getLauncherFinWindow = () => {
  const { fin } = window;
  if (!fin || !fin.desktop || !fin.desktop.Application) {
    return Promise.resolve(undefined);
  }
  return Promise.resolve(fin.desktop.Application.getCurrent().getWindow());
};

export const getFinWindowByName = (name: string) => {
  const { fin } = window;
  if (!fin) {
    return Promise.resolve(undefined);
  }

  const uuid = getOwnUuid();
  const finWindow = fin.desktop.Window.wrap(uuid, name);

  return finWindow.getNativeWindow() ? Promise.resolve(fin.desktop.Window.wrap(uuid, name)) : Promise.resolve(undefined);
};
