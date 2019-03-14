import { Action } from 'redux';

import { Bounds, PrimaryDirectionalCoordinates } from '../../types/commons';
import { ActionsUnion } from '../types';
import { closeContextMenu, openContextMenu } from './actions';

// Commons
export interface ContextMenuOption {
  label: string;
  action: Action;
}

// Reducer
export interface ContextMenuState {
  anchor: PrimaryDirectionalCoordinates | undefined;
  options: ContextMenuOption[];
  bounds: Bounds | undefined;
}

// Action payloads
export interface ContextMenuRequestPayload {
  anchor: PrimaryDirectionalCoordinates;
  options: ContextMenuOption[];
}

export interface ContextMenuSuccessPayload {
  anchor: PrimaryDirectionalCoordinates;
  options: ContextMenuOption[];
  bounds: Bounds;
}

// Actions
export type ContextMenuActions = ActionsUnion<typeof closeContextMenu> | ActionsUnion<typeof openContextMenu>;
