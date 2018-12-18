import { matchPath } from 'react-router-dom';

import { AppRoute } from '../components/Router/routes';

export const doesCurrentPathMatch = (routes: AppRoute[], currentPath: string) => {
  return !!routes.find(route => !!matchPath(currentPath, route));
};
