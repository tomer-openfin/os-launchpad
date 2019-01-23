import { State } from '../types';

export const getMeState = (state: State) => state.me;

export const getIsAdmin = (state: State) => getMeState(state).isAdmin;
export const getMeSettings = (state: State) => getMeState(state).settings;
export const getIsLoggedIn = (state: State) => {
  const meState = getMeState(state);
  return !!meState.email && !!meState.firstName && !!meState.lastName;
};

export const getMeLoginState = (state: State) => getMeState(state).login;

export const getAutoHide = (state: State) => getMeSettings(state).autoHide;
export const getLauncherPosition = (state: State) => getMeSettings(state).launcherPosition;
export const getAppsLauncherIds = (state: State) => getMeSettings(state).appIds;

export const getIsLauncherAppFromId = (state: State, appId: string) => getAppsLauncherIds(state).indexOf(`${appId}`) !== -1;
