import { createSelector } from 'reselect';
import { getImagesFromManifestOverrideOrManifest } from '../../utils/manifestOverride';
import { State } from '../types';

export const getApplicationState = (state: State) => state.application;
export const getApplicationIsExpanded = (state: State) => getApplicationState(state).isExpanded;
export const getIsDragAndDrop = (state: State) => getApplicationState(state).isDragAndDrop;
export const getDrawerIsExpanded = (state: State) => getApplicationState(state).isDrawerExpanded;
export const getIsEnterprise = (state: State) => getApplicationState(state).isEnterprise;
export const getRuntimeVersion = (state: State) => getApplicationState(state).runtimeVersion;
export const getManifest = (state: State) => getApplicationState(state).manifest;
export const getManifestOverride = (state: State) => getApplicationState(state).manifestOverride;

export const getManifestImages = createSelector(
  [getManifest, getManifestOverride],
  getImagesFromManifestOverrideOrManifest,
);
