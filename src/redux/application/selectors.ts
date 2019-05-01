import { createSelector } from 'reselect';
import { getImagesFromManifestOverrideOrManifest, getShortcutNameFromManifestOverrideOrManifest } from '../../utils/manifestOverride';
import { State } from '../types';

export const getApplicationState = (state: State) => state.application;
export const getIsDragAndDrop = (state: State) => getApplicationState(state).isDragAndDrop;
export const getDrawerIsExpanded = (state: State) => getApplicationState(state).isDrawerExpanded;
export const getIsEnterprise = (state: State) => getApplicationState(state).isEnterprise;
export const getRuntimeVersion = (state: State) => getApplicationState(state).runtimeVersion;
export const getApplicationManifest = (state: State) => getApplicationState(state).manifest;
export const getApplicationManifestOverride = (state: State) => getApplicationState(state).manifestOverride;

export const getManifestImages = createSelector(
  [getApplicationManifest, getApplicationManifestOverride],
  getImagesFromManifestOverrideOrManifest,
);

export const getManifestShortcutName = createSelector(
  [getApplicationManifest, getApplicationManifestOverride],
  getShortcutNameFromManifestOverrideOrManifest,
);
