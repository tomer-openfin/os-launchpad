import { Layout } from 'openfin-layouts/dist/client/types';

const { NODE_ENV, STORYBOOK_ENV } = process.env;

const isNotFin = NODE_ENV === 'test' || STORYBOOK_ENV === 'true';

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
 * The reason for this file is because when openfin-layouts is imported
 * it does setup speficially for openfin applications with window.fin available.
 * This will break the testing suites and storybook, so as a result,
 * only import the openfin-layouts lib when in an openfin environment
 */
// tslint:disable-next-line:no-var-requires
export const generateLayout = isNotFin ? mockGenerateLayout : require('openfin-layouts').generateLayout;
// tslint:disable-next-line:no-var-requires
export const restoreLayout = isNotFin ? mockRestoreLayout : require('openfin-layouts').restoreLayout;
