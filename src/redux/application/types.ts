import { openfinReady } from './actions';

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

// Actions
export type OpenfinReadyAction = ReturnType<typeof openfinReady>;
