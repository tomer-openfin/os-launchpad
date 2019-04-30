import { Action } from 'redux';

import { Bounds, PointTopLeft } from '../../types/commons';
import { ActionsUnion } from '../types';
import { closeContextMenu, openContextMenu } from './actions';

// Commons
export interface ContextMenuOption {
  label: string;
  action: Action;
}

// Reducer
export interface ContextMenuState {
  anchor: PointTopLeft | undefined;
  options: ContextMenuOption[];
  bounds: Bounds | undefined;
}

// Action payloads
export interface ContextMenuRequestPayload {
  anchor: PointTopLeft;
  options: ContextMenuOption[];
}

export interface ContextMenuSuccessPayload {
  anchor: PointTopLeft;
  options: ContextMenuOption[];
  bounds: Bounds;
}

// Actions
export type ContextMenuActions = ActionsUnion<typeof closeContextMenu> | ActionsUnion<typeof openContextMenu>;
