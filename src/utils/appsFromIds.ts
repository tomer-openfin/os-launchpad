import { AppsById } from '../redux/apps';
import { App } from '../types/commons';

const appsFromIds = (appsById: AppsById, ids: string[] = []): App[] =>
  ids.reduce((apps: App[], id) => {
    const app = appsById[id];
    if (app) apps.push(app);
    return apps;
  }, []);

export default appsFromIds;
