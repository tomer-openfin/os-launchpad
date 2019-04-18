import { createSelector } from 'reselect';

import { hashString } from '../../utils/hashString';
import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { State } from '../types';

export const getMeState = (state: State) => state.me;

export const getMeName = (state: State) => {
  const { firstName, lastName } = getMeState(state);
  return `${firstName} ${lastName}`;
};
export const getSessionTimestamp = (state: State) => getMeState(state).sessionTimestamp;
export const getIsAdmin = (state: State) => getMeState(state).isAdmin;
export const getMeEmail = (state: State) => getMeState(state).email;
export const getMeAuthMessaging = (state: State) => getMeState(state).authMessaging;
export const getMeAuthMessage = (state: State) => getMeAuthMessaging(state).message;
export const getMeAuthIsError = (state: State) => getMeAuthMessaging(state).isError;
export const getMeSettings = (state: State) => getMeState(state).settings;
export const getIsLoggedIn = (state: State) => {
  const meState = getMeState(state);
  return !!meState.email && !!meState.firstName && !!meState.lastName;
};

export const getAppsLauncherIds = (state: State) => getMeSettings(state).appIds;
export const getAutoHide = (state: State) => getMeSettings(state).autoHide;
export const getLauncherPosition = (state: State) => getMeSettings(state).launcherPosition;
export const getLauncherSize = (state: State) => getMeSettings(state).launcherSize;
export const getLauncherSizeConfig = (state: State) => launcherSizeConfigs[getLauncherSize(state)];
export const getLauncherMonitorId = (state: State) => getMeSettings(state).launcherMonitorId;
export const getLauncherMonitorReferencePoint = (state: State) => getMeSettings(state).launcherMonitorReferencePoint;

export const getIsLauncherAppFromId = (state: State, appId: string) => getAppsLauncherIds(state).indexOf(`${appId}`) !== -1;

export const getSID = createSelector(
  [getMeEmail, getSessionTimestamp],
  (email, sessionTimestamp) => hashString(email, sessionTimestamp || ''),
);
