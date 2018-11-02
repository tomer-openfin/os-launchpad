import { LOGIN_ROUTE } from '../components/Router';

const { NODE_ENV } = process.env;

const WINDOW_PREFIX = 'osLaunchpad';
export const LOGIN_WINDOW = `${WINDOW_PREFIX}Login`;

const isProduction = NODE_ENV === 'production';

const config = {
  login: {
    alwaysOnTop: false,
    autoShow: true,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 500,
    defaultWidth: 400,
    frame: true,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: true,
    name: LOGIN_WINDOW,
    resizable: true,
    saveWindowState: true,
    showTaskbarIcon: true,
    // smallWindow: false,
    url: LOGIN_ROUTE,
    waitForPageLoad: true,
  },
};

export default config;
