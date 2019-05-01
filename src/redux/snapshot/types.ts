import { Bounds, Identity, PrimaryDirectionalCoordinates } from '../../types/commons';
import { ActionsUnion } from '../types';
import { clearSnapshot, getAndSetSnapshot, setSnapshotAnchor } from './actions';

// Reducer
export interface SnapshotState {
  anchor: PrimaryDirectionalCoordinates;
  anchorIdentity: Identity | null;
  imgSrc: string;
  sourceBounds: Bounds;
  sourceIdentity: Identity | null;
}

// Actions
export type SnapshotActions = ActionsUnion<typeof getAndSetSnapshot> | ReturnType<typeof clearSnapshot> | ReturnType<typeof setSnapshotAnchor>;
