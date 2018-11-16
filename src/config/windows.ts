import ROUTES from '../components/Router/const';

const { NODE_ENV } = process.env;

const WINDOW_PREFIX = 'osLaunchpad';
export const ADMIN_WINDOW = `${WINDOW_PREFIX}Admin`;
export const MAIN_WINDOW = 'osLaunchpadMain';
export const LOGIN_WINDOW = `${WINDOW_PREFIX}Login`;
export const APP_DIRECTORY_WINDOW = `${WINDOW_PREFIX}AppDirectory`;
export const APP_LAUNCHER_OVERFLOW_WINDOW = `${WINDOW_PREFIX}AppLauncherOverflow`;
export const SETTINGS_WINDOW = `${WINDOW_PREFIX}Settings`;
export const LAYOUTS_WINDOW = `${WINDOW_PREFIX}Layouts`;
export const USER_DIRECTORY_WINDOW = `${WINDOW_PREFIX}UserDirectory`;
export const NEW_USER_WINDOW = `${WINDOW_PREFIX}NewUser`;

const isProduction = NODE_ENV === 'production';

export const initOnStartWindows = {
  // eventually move admin window out of initOnStartWindows and only initialize on login if isAdmin
  admin: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 600,
    defaultWidth: 600,
    // temp until designs come in for custom frame
    frame: true,
    id: ADMIN_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: true,
    name: ADMIN_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.ADMIN,
    waitForPageLoad: true,
  },
  appDirectory: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 400,
    defaultWidth: 540,
    frame: false,
    id: APP_DIRECTORY_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: APP_DIRECTORY_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.APP_DIRECTORY,
    waitForPageLoad: true,
  },
  appLauncherOverflow: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 300,
    defaultWidth: 200,
    frame: false,
    id: APP_LAUNCHER_OVERFLOW_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: APP_LAUNCHER_OVERFLOW_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.APP_LAUNCHER_OVERFLOW,
    waitForPageLoad: true,
  },
  layouts: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 100,
    defaultWidth: 50,
    frame: false,
    id: LAYOUTS_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: LAYOUTS_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.LAYOUTS,
    waitForPageLoad: true,
  },
  settings: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 300,
    defaultWidth: 300,
    frame: true,
    id: SETTINGS_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: SETTINGS_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.SETTINGS,
    waitForPageLoad: true,
  },
};

const config = {
  ...initOnStartWindows,
  login: {
    alwaysOnTop: false,
    autoShow: true,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 500,
    defaultWidth: 400,
    frame: true,
    id: LOGIN_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: true,
    name: LOGIN_WINDOW,
    resizable: false,
    saveWindowState: true,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: ROUTES.LOGIN,
    waitForPageLoad: true,
  },
};

export default config;
