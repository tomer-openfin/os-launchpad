import { Layout } from 'openfin-layouts/dist/client/types';

import { getLayoutsError, getLayoutsRequest, getLayoutsSuccess, restoreLayout, saveLayoutError, saveLayoutRequest, saveLayoutSuccess } from './';

// State
export interface LayoutsState {
  byId: {
    [id: string]: Layout;
  };
  ids: string[];
}

// Action payloads
export type GetLayoutsSuccessPayload = Layout[];

// Action creators
export type GetLayoutsError = ReturnType<typeof getLayoutsError>;
export type GetLayoutsRequest = ReturnType<typeof getLayoutsRequest>;
export type GetLayoutsSuccess = ReturnType<typeof getLayoutsSuccess>;
export type RestoreLayout = ReturnType<typeof restoreLayout>;
export type SaveLayoutError = ReturnType<typeof saveLayoutError>;
export type SaveLayoutRequest = ReturnType<typeof saveLayoutRequest>;
export type SaveLayoutSuccess = ReturnType<typeof saveLayoutSuccess>;

export type LayoutsActions = GetLayoutsError | GetLayoutsRequest | GetLayoutsSuccess | RestoreLayout | SaveLayoutRequest | SaveLayoutSuccess | SaveLayoutError;
