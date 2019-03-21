import { ActionsUnion } from '../types';
import { sendSupport } from './actions';

export interface SendSupportRequestPayload {
  description: string;
  email: string;
}

export interface SendSupportSuccessPayload {
  referenceNumber: string | number;
}

// TODO: revisit error.
export interface SendSupportErrorPayload {
  status: string;
  code?: string;
  message?: string;
}

export type SendSupportActions = ActionsUnion<typeof sendSupport>;
