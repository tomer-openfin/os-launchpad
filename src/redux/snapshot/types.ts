import { Identity } from '../../types/commons';
import { clearSnapshot, setOverlayIdentity, setSnapshot, setSnapshotImgSrc } from './actions';

// Reducer
export interface SnapshotState {
  anchorIdentity: Identity | null;
  imgSrc: string;
  overlayIdentity: Identity | null;
  snapshotIdentity: Identity | null;
}

// Actions
export type SnapshotActions =
  | ReturnType<typeof clearSnapshot>
  | ReturnType<typeof setOverlayIdentity>
  | ReturnType<typeof setSnapshot>
  | ReturnType<typeof setSnapshotImgSrc>;
