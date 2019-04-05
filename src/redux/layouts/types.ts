import { UserLayout } from '../../types/commons';
import { ActionsUnion } from '../types';
import {
  createLayout,
  deleteLayout,
  dismissUndoUpdateLayout,
  getLayouts,
  resetLayouts,
  restoreLayout,
  saveLayout,
  undoUpdateLayout,
  updateLayout,
} from './actions';

// State
export interface LayoutsState {
  byId: {
    [id: string]: UserLayout;
  };
  ids: string[];
}

// Action payloads
export type GetLayoutsSuccessPayload = UserLayout[];
export interface UpdateLayoutRequestPayload {
  id: string;
  isOverwrite: boolean;
  layout: UserLayout;
  name: string;
}
export interface CreateOrUpdateSuccessPayload {
  layout: UserLayout;
  updated?: boolean;
  previousUserLayout?: UserLayout;
}

// Actions
export type LayoutsActions =
  | ActionsUnion<typeof getLayouts>
  | ActionsUnion<typeof restoreLayout>
  | ActionsUnion<typeof createLayout>
  | ActionsUnion<typeof dismissUndoUpdateLayout>
  | ActionsUnion<typeof undoUpdateLayout>
  | ActionsUnion<typeof updateLayout>
  | ActionsUnion<typeof deleteLayout>
  | ActionsUnion<typeof saveLayout>
  | ReturnType<typeof resetLayouts>;
