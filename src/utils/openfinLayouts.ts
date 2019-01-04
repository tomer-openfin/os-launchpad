import { Layout } from 'openfin-layouts/dist/client/types';
import { isStorybookEnv, isTestEnv } from './processHelpers';

const isNotFin = isTestEnv() || isStorybookEnv();

enum OpenfinLayout {
  type = 'layout',
}

const mockLayout = {
  apps: [],
  monitorInfo: {},
  tabGroups: [],
  type: OpenfinLayout.type,
};

const mockDeregister = () => Promise.resolve(undefined);
const mockGenerateLayout = (): Promise<Layout> => Promise.resolve(mockLayout);
const mockRestoreLayout = (layout: Layout): Promise<Layout> => Promise.resolve(layout);

/**
 * The reason for this file is because when openfin-layouts is imported
 * it does setup speficially for openfin applications with window.fin available.
 * This will break the testing suites and storybook, so as a result,
 * only import the openfin-layouts lib when in an openfin environment
 */
// tslint:disable-next-line:no-var-requires
export const generateLayout = isNotFin ? mockGenerateLayout : require('openfin-layouts').generateLayout;
// tslint:disable-next-line:no-var-requires
export const restoreLayout = isNotFin ? mockRestoreLayout : require('openfin-layouts').restoreLayout;
// tslint:disable-next-line:no-var-requires
export const deregister = isNotFin ? mockDeregister : require('openfin-layouts').deregister;
