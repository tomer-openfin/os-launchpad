import { matchPath } from 'react-router-dom';
import { PushRoute } from '../types/commons';

export const doesCurrentPathMatch = (paths: string[], currentPath: string) => {
  return !!paths.find(path => !!matchPath(currentPath, path));
};

export const createPushRouteHandler = <T>(pushRoute: PushRoute, route: string, item?: T) => () => pushRoute(route, item);
