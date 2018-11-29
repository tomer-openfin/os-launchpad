import { Action } from 'redux';

import { Bounds, PrimaryDirectionalCoordinates } from '../../types/commons';
import { openContextMenuRequest, openContextMenuSuccess } from './actions';

// Commons
export interface ContextMenuOption {
  label: string;
  action: Action;
}

// Reducer
export interface ContextMenuState {
  anchor: PrimaryDirectionalCoordinates | undefined;
  isOpen: boolean;
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
export type OpenContextMenuRequest = ReturnType<typeof openContextMenuRequest>;
export type OpenContextMenuSuccess = ReturnType<typeof openContextMenuSuccess>;

export type ContextMenuActions = OpenContextMenuRequest | OpenContextMenuSuccess;
