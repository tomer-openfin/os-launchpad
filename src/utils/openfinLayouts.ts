import { Layout } from 'openfin-layouts/dist/client/types';

const isTest = process.env.NODE_ENV === 'test';

enum OpenfinLayout {
  type = 'layout',
}

const mockLayout = {
  apps: [],
  monitorInfo: {},
  tabGroups: [],
  type: OpenfinLayout.type,
};

const mockGenerateLayout = (): Promise<Layout> => Promise.resolve(mockLayout);
const mockRestoreLayout = (layout: Layout): Promise<Layout> => Promise.resolve(layout);

/**
 * The reason for this is because when openfin-layouts is imported
 * it does setup speficially for openfin applications with window.fin available.
 * This will break the testing suite, so as a result,
 * only import the openfin-layouts lib when not in a testing env
 */
// tslint:disable-next-line:no-var-requires
export const generateLayout = isTest ? mockGenerateLayout : require('openfin-layouts').generateLayout;
// tslint:disable-next-line:no-var-requires
export const restoreLayout = isTest ? mockRestoreLayout : require('openfin-layouts').restoreLayout;
