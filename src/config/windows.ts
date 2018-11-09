import { APP_DIRECTORY_ROUTE, APP_LAUNCHER_OVERFLOW_ROUTE, LOGIN_ROUTE } from '../components/Router/const';

const { NODE_ENV } = process.env;

const WINDOW_PREFIX = 'osLaunchpad';
export const MAIN_WINDOW = 'osLaunchpadMain';
export const LOGIN_WINDOW = `${WINDOW_PREFIX}Login`;
export const APP_DIRECTORY_WINDOW = `${WINDOW_PREFIX}AppDirectory`;
export const APP_LAUNCHER_OVERFLOW_WINDOW = `${WINDOW_PREFIX}AppLauncherOverflow`;

const isProduction = NODE_ENV === 'production';

const config = {
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
    url: APP_DIRECTORY_ROUTE,
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
    url: APP_LAUNCHER_OVERFLOW_ROUTE,
    waitForPageLoad: true,
  },
  login: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 500,
    defaultWidth: 400,
    frame: false,
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
    url: LOGIN_ROUTE,
    waitForPageLoad: true,
  },
};

export default config;
