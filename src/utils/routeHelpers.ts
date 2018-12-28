import { matchPath } from 'react-router-dom';

export const doesCurrentPathMatch = (paths: string[], currentPath: string) => {
  return !!paths.find(path => !!matchPath(currentPath, path));
};
