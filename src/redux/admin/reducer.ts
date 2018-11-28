import { CREATE_ADMIN_USER, DELETE_ADMIN_USER, GET_ADMIN_APPS, GET_ADMIN_USERS, UPDATE_ADMIN_USER } from './actions';

import { formatByIds } from '../../utils/byIds';

import { App, ById, User } from '../../types/commons';
import { AdminState } from './types';

const defaultState: AdminState = {
  apps: {
    byId: {},
    ids: [],
  },
  users: {
    byId: {},
    ids: [],
  },
};

export default (state: AdminState = defaultState, action): AdminState => {
  switch (action.type) {
    case GET_ADMIN_APPS.SUCCESS: {
      const appList: App[] = action.payload;

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
    case GET_ADMIN_USERS.SUCCESS: {
      const userList: User[] = action.payload;

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
    case CREATE_ADMIN_USER.SUCCESS: {
      const user: User = action.payload;

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
    case UPDATE_ADMIN_USER.SUCCESS: {
      const user: User = action.payload;

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
    case DELETE_ADMIN_USER.SUCCESS: {
      const user: User = action.payload;

      const { [user.id]: deletedItem, ...byId } = state.users.byId;

      return {
        ...state,
        users: {
          ...state.users,
          byId,
        },
      };
    }
    default: {
      return state;
    }
  }
};
