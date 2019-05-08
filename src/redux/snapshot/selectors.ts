import { State } from '../types';

export const getSnapshotState = (state: State) => state.snapshot;
export const getSnapshotAnchorIdentity = (state: State) => getSnapshotState(state).anchorIdentity;
export const getSnapshotIdentity = (state: State) => getSnapshotState(state).snapshotIdentity;
export const getSnapshotImgSrc = (state: State) => getSnapshotState(state).imgSrc;
export const getSnapshotOverlayIdentity = (state: State) => getSnapshotState(state).overlayIdentity;
