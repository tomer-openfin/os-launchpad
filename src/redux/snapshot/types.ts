import { Bounds, Identity, PointTopLeft } from '../../types/commons';
import { ActionsUnion } from '../types';
import { clearSnapshot, getAndSetSnapshot, setSnapshotAnchor } from './actions';

// Reducer
export interface SnapshotState {
  anchor: PointTopLeft;
  anchorIdentity: Identity | null;
  imgSrc: string;
  sourceBounds: Bounds;
  sourceIdentity: Identity | null;
}

// Actions
export type SnapshotActions = ActionsUnion<typeof getAndSetSnapshot> | ReturnType<typeof clearSnapshot> | ReturnType<typeof setSnapshotAnchor>;
