import { createAction } from '../utils';

import { Identity } from '../../types/commons';

const CLEAR_SNAPSHOT = 'CLEAR_SNAPSHOT';
const SET_OVERLAY_IDENTITY = 'SET_OVERLAY_IDENTITY';
const SET_SNAPSHOT = 'SET_SNAPSHOT';
const SET_SNAPSHOT_IMG_SRC = 'SET_SNAPSHOT_IMG_SRC';

export const clearSnapshot = createAction(CLEAR_SNAPSHOT)();
export const setOverlayIdentity = createAction(SET_OVERLAY_IDENTITY)<Identity | null>();
export const setSnapshot = createAction(SET_SNAPSHOT)<{
  anchorIdentity: Identity;
  snapshotIdentity: Identity;
}>();
export const setSnapshotImgSrc = createAction(SET_SNAPSHOT_IMG_SRC)<string>();
