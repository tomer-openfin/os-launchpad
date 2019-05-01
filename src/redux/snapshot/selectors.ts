import { State } from '../types';

export const getSnapshotState = (state: State) => state.snapshot;
export const getSnapshotAnchor = (state: State) => getSnapshotState(state).anchor;
export const getSnapshotAnchorIdentity = (state: State) => getSnapshotState(state).anchorIdentity;
export const getSnapshotImgSrc = (state: State) => getSnapshotState(state).imgSrc;
export const getSnapshotSourceBounds = (state: State) => getSnapshotState(state).sourceBounds;
export const getSnapshotSourceIdentity = (state: State) => getSnapshotState(state).sourceIdentity;
