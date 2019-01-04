const DEVELOPMENT = 'development';
const FALSE = 'false';
const PRODUCTION = 'production';
const TEST = 'test';
const TRUE = 'true';

const { DEV_TOOLS_ON_STARTUP = FALSE, ENTERPRISE = FALSE, NODE_ENV = DEVELOPMENT, STORYBOOK_ENV = FALSE } = process.env;

export const hasDevToolsOnStartup = () => DEV_TOOLS_ON_STARTUP === TRUE;
export const isDevelopmentEnv = () => NODE_ENV === DEVELOPMENT;
export const isEnterpriseEnv = () => ENTERPRISE === TRUE;
export const isProductionEnv = () => NODE_ENV === PRODUCTION;
export const isStorybookEnv = () => STORYBOOK_ENV === TRUE;
export const isTestEnv = () => NODE_ENV === TEST;
