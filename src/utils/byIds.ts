import { ById, ObjectWithId } from '../types/commons';

export const objectsFromIds = <T extends ObjectWithId>(byId: ById<T>, ids: string[] = []): T[] =>
  ids.reduce((items: T[], id) => {
    const item = byId[id];

    if (item) items.push(item);

    return items;
  }, []);

export const formatByIds = <T extends ObjectWithId>(list: T[]): ById<T> =>
  list.reduce((byId: ById<T>, item: T) => {
    byId[item.id] = item;

    return byId;
  }, {});
