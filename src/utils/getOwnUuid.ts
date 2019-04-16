const MAIN_WINDOW = 'osLaunchpadMain';

export default () => {
  const { fin } = window;
  if (!fin) {
    return process.env.APP_UUID || MAIN_WINDOW;
  }

  return fin.desktop.Application.getCurrent().uuid;
};
