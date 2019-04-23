import { App, ById, User } from '../../types/commons';
import { DeepReadonly } from '../../types/utils';
import { formatByIds } from '../../utils/byIds';
import { createAdminApp, createAdminUser, deleteAdminApp, deleteAdminUser, getAdminApps, getAdminUsers, updateAdminApp, updateAdminUser } from './actions';
import { AdminActions, AdminState } from './types';

type ReadonlyAdminState = DeepReadonly<AdminState>;

const defaultState: ReadonlyAdminState = {
  apps: {
    byId: {},
    ids: [],
  },
  users: {
    byId: {},
    ids: [],
  },
};

export default (state: ReadonlyAdminState = defaultState, action: AdminActions): ReadonlyAdminState => {
  switch (action.type) {
    case getAdminApps.success.toString(): {
      const appList = action.payload;

      const byId: ById<App> = formatByIds(appList);
      const ids: string[] = Object.keys(byId);

      return {
        ...state,
        apps: {
          byId,
          ids,
        },
      };
    }
    case createAdminApp.success.toString(): {
      const app = action.payload;

      return {
        ...state,
        apps: {
          byId: {
            ...state.apps.byId,
            [app.id]: app,
          },
          ids: [...state.apps.ids, app.id],
        },
      };
    }
    case updateAdminApp.success.toString(): {
      const app = action.payload;

      return {
        ...state,
        apps: {
          ...state.apps,
          byId: {
            ...state.apps.byId,
            [app.id]: app,
          },
        },
      };
    }
    case deleteAdminApp.success.toString(): {
      const app = action.payload;

      const { [app.id]: deletedItem, ...byId } = state.apps.byId;
      const ids: string[] = Object.keys(byId);

      return {
        ...state,
        apps: {
          byId,
          ids,
        },
      };
    }
    case getAdminUsers.success.toString(): {
      const userList = action.payload;

      const byId: ById<User> = formatByIds(userList);
      const ids: string[] = Object.keys(byId);

      return {
        ...state,
        users: {
          byId,
          ids,
        },
      };
    }
    case createAdminUser.success.toString(): {
      const user = action.payload;

      return {
        ...state,
        users: {
          byId: {
            ...state.users.byId,
            [user.id]: user,
          },
          ids: [...state.users.ids, user.id],
        },
      };
    }
    case updateAdminUser.success.toString(): {
      const user = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [user.id]: user,
          },
        },
      };
    }
    case deleteAdminUser.success.toString(): {
      const user = action.payload;

      const { [user.id]: deletedItem, ...byId } = state.users.byId;
      const ids: string[] = Object.keys(byId);

      return {
        ...state,
        users: {
          byId,
          ids,
        },
      };
    }
    default: {
      return state;
    }
  }
};
