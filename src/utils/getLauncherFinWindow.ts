export const getLauncherFinWindow = () => {
  const { fin } = window;
  if (!fin || !fin.desktop || !fin.desktop.Application) {
    return Promise.resolve(undefined);
  }
  return Promise.resolve(fin.desktop.Application.getCurrent().getWindow());
};

export const getFinWindowByName = (name: string) => {
  const { fin } = window;
  if (!fin || !fin.desktop || !fin.desktop.Application) {
    return Promise.resolve(undefined);
  }

  return new Promise(resolve => {
    fin.desktop.Application.getCurrent().getChildWindows(children => {
      if (Array.isArray(children)) {
        const win = children.find(child => child.name === name);

        resolve(win);
      } else {
        resolve(undefined);
      }
    });
  });
};
